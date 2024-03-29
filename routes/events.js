var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const { ensureLogin } = require('../middleware/guards');


/**
 * Guards
 */

async function ensureActivityExists(req, res, next){
  try {
    let results = await db(`SELECT * FROM activities WHERE activities_id = ${req.params.id}`);
    if (results.data.length === 1){
      res.locals.activity = results.data[0];
      next();
    } else {
      res.status(404).send({ error: 'Event not found' });
    }
  } catch(err) {
    res.status(500).send({ error: err.message });
  }
}

/**
 * Helpers
 */

async function sendAllActivities(res) {
  let results = await db(`SELECT * FROM activities`);
  res.send(results.data);
}

function joinAllToJson(results){
  let users = [];
  let activitiesVisited = [];
  let allActivities = [];
  console.log(allActivities)
  for (obj of results) {
    if (obj.userId && !(activitiesVisited.includes(obj.activities_id))){
      let events = results.filter(x => x.activities_id === obj.activities_id);
      users = events.map(row => ({
        id: row.userId,
        username: row.username
      }));
      let activity = {
        id: obj.activitiesId,
        name: obj.activityName,
        description: obj.description,
        location: obj.location,
        keyInfo_id: obj.keyInfo_id,
        votes: obj.votes,
        price: obj.price,
        author_id: obj.user_id,
        users
      }
      allActivities.push(activity)
      activitiesVisited.push(obj.activities_id);
    } else if (!(activitiesVisited.includes(obj.activities_id))){
      let activity = {
        id: obj.activitiesId,
        name: obj.activityName,
        description: obj.description,
        location: obj.location,
        keyInfo_id: obj.keyInfo_id,
        votes: obj.votes,
        price: obj.price,
        author_id: obj.user_id,
        users: []
      }
      allActivities.push(activity)
      activitiesVisited.push(obj.activities_id);
    }
  }
  return allActivities;
}

function joinToJson(results) {
  let row0 = results.data[0];
  let users = [];
  if (row0.userId) {
    users = results.data.map(row => ({
      id: row.userId,
      username: row.username
    }));
  }
  let activity = {
    id: row0.activitiesId,
    name: row0.activityName,
    description: row0.description,
    location: row0.location,
    keyInfo_id: row0.keyInfo_id,
    votes: row0.votes,
    author_id: row0.user_id,
    users
  };
  return activity;
}

/* GET all event (activity) listings. */
router.get('/', ensureLogin, async function(req, res, next) {
  try {
    let sql = `
    SELECT a.*, u.*, a.activities_id AS activitiesId, u.id AS userId
    FROM activities AS a
    LEFT JOIN users_activities AS ua ON a.activities_id = ua.activitiesId
    LEFT JOIN users AS u ON ua.userId = u.id
    `;
    let results = await db(sql);
    activities = joinAllToJson(results.data);
    res.send(activities);
  }catch (err) {
    res.status(500).send({error: err.message});
  }
});

/* GET event (activity) listing by ID */
router.get(`/:id`, ensureLogin, ensureActivityExists, async function (req, res, next) {
  let activity = res.locals.activity;
  try {
    let sql = `
    SELECT a.*, u.*, a.activities_id AS activitiesId, u.id AS userId
    FROM activities AS a
    LEFT JOIN users_activities AS ua ON a.activities_id = ua.activitiesId
    LEFT JOIN users AS u ON ua.userId = u.id
    WHERE a.activities_id = ${activity.activities_id}
    `;
    let results = await db(sql);
    activity = joinToJson(results);
    res.send(activity);
  } catch(err) {
    res.status(500).send({error: err.message})
  }
});


// INSERT INTO activities (activityName, description, price, location, keyInfo_id)
//     VALUES ("${newEvent.activityName}", "${newEvent.description}", ${newEvent.price}, "${newEvent.location}", ${newEvent.keyInfo_id});
/* POST a new event (keyInfo) and associated activities */
router.post('/', ensureLogin, async function(req, res, next) {
  let newEvent = req.body;
  let sql = `
    INSERT INTO keyInfo (date, title, deadline)
    VALUES ("${newEvent.date}", "${newEvent.title}", "${newEvent.deadline}");
    SELECT LAST_INSERT_ID();
  `;
  try {
    let results = await db(sql);
    let newKeyInfo_id = results.data[0].insertId;
    let sql2 = `
      INSERT INTO activities (activityName, description, price, location, keyInfo_id, user_id)
      VALUES ("${newEvent.activityNameOne}", "${newEvent.descriptionOne}", ${newEvent.priceOne}, "${newEvent.locationOne}", ${newKeyInfo_id}, ${newEvent.user});
      INSERT INTO activities (activityName, description, price, location, keyInfo_id, user_id)
      VALUES ("${newEvent.activityNameTwo}", "${newEvent.descriptionTwo}", ${newEvent.priceTwo}, "${newEvent.locationTwo}", ${newKeyInfo_id}, ${newEvent.user});
      `;
    await db(sql2);
    let sql3 = `
    SELECT a.*, u.*, a.activities_id AS activitiesId, u.id AS userId
    FROM activities AS a
    LEFT JOIN users_activities AS ua ON a.activities_id = ua.activitiesId
    LEFT JOIN users AS u ON ua.userId = u.id
    `;
    let results2 = await db(sql3);
    activities = joinAllToJson(results2.data);
    res.send(activities);
  } catch(err) {
    res.status(500).send({error: err.message})
  }
})


// PATCH modified vote count
router.patch('/:id', ensureLogin, async function(req, res, next) {
  const id = req.params.id;
  const changes = req.body;
  let sql = `
    UPDATE activities SET votes = ${changes.count}
    WHERE activities_id = ${id};

    INSERT INTO users_activities (userId, activitiesId)
    VALUES (${changes.userId}, ${changes.id})
  `;
  try {
    await db(sql);
    let sql2 = `
    SELECT a.*, u.*, a.activities_id AS activitiesId, u.id AS userId
    FROM activities AS a
    LEFT JOIN users_activities AS ua ON a.activities_id = ua.activitiesId
    LEFT JOIN users AS u ON ua.userId = u.id
    `;
    let result = await db(sql2);
    activities = joinAllToJson(result.data);
    res.send(activities);
  } catch(err) {
    res.status(500).send({error: err.message})
  }
});

router.delete('/:id', ensureLogin, async function(req, res, next) {
  let id = req.params.id;
  try {
    let result = await db(`SELECT * FROM activities WHERE activities_id = ${id}`);
    let relatedKeyInfo = result.data[0].keyInfo_id;
    console.log(relatedKeyInfo);
    if (result.data.length === 0){
      res.status(404).send({error: 'item not found'});
    } else {
      await db(`DELETE FROM activities WHERE activities_id = ${id}`);
      let keyInfoCheck = await db(`SELECT * FROM activities WHERE keyInfo_id = ${relatedKeyInfo}`);
      if (keyInfoCheck.data.length === 0){
        let sql = (`DELETE FROM keyInfo WHERE keyInfo_id = ${relatedKeyInfo}`);
        await db(sql);
      }
      let sql = `
      SELECT a.*, u.*, a.activities_id AS activitiesId, u.id AS userId
      FROM activities AS a
      LEFT JOIN users_activities AS ua ON a.activities_id = ua.activitiesId
      LEFT JOIN users AS u ON ua.userId = u.id
      `;
      let results = await db(sql);
      activities = joinAllToJson(results.data);
      res.send(activities);
    }
  } catch(err) {
    res.status(500).send({error: err.message})
  }
})

module.exports = router;
