var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const { ensureLogin } = require('../middleware/guards');


/* GET all event (activity) listings. */
router.get('/', async function(req, res, next) {
  try {
    let result = await db('SELECT * FROM activities');
    let event = result.data;
    res.send(event);
  }catch (err) {
    res.status(500).send({error: err.message});
  }
});

/* GET event (activity) listing by ID */
router.get(`/:id`, ensureLogin, async function (req, res, next) {
  let id = Number(req.params.id);
  try {
    let result = await db(`SELECT * FROM activities WHERE activities_id = ${id}`);
    if (result.data.length === 0) {
      res.status(404).send({error: 'item not found'})
    } else {
      res.send(result.data[0])
    }
  } catch(err) {
    res.status(500).send({error: err.message})
  }
});

/* POST a new event (keyInfo) and associated activities */
router.post('/', ensureLogin, async function(req, res, next) {
  let newEvent = req.body;
  let sql = `
    INSERT INTO activities (activityName, description, price, location, keyInfo_id)
    VALUES ("${newEvent.activityName}", "${newEvent.description}", ${newEvent.price}, "${newEvent.location}", ${newEvent.keyInfo_id});
    INSERT INTO keyInfo (date, title, deadline)
    VALUES ("${newEvent.date}", "${newEvent.title}", "${newEvent.deadline}")
  `;
  try {
    await db(sql);
    let result = await db(`SELECT * FROM activities`);
    res.status(201).send(result.data)
  } catch(err) {
    res.status(500).send({error: err.message})
  }
})


// PATCH modified vote count
router.patch('/:id', ensureLogin, async function(req, res, next) {
  const id = req.params.id;
  const changes = req.body;
  let sql = `
    UPDATE activities SET votes = ${changes.count},
    attending = "${changes.attending}" 
    WHERE activities_id = ${id}
  `;
  try {
    await db(sql);
    let result = await db(`SELECT * FROM activities`);
    res.send(result.data)
  } catch(err) {
    res.status(500).send({error: err.message})
  }
});

module.exports = router;
