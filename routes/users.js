var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");


/**
 * Guards
 **/
async function ensureUserExists(req, res, next){
    try {
        let results = await db(`SELECT * FROM users WHERE id = ${req.params.id}`);
        if (results.data.length === 1){
            res.locals.user = results.data[0];
            next();
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch(err) {
        res.status(500).send({ error: err.message });
    }
}

/**
 * Helpers
 **/

async function sendAllUsers(res){
    let results = await db(`SELECT * FROM users`);
    res.send(results.data);
}

function joinToJson(results) {
    let row0 = results.data[0];
    let activities = [];
    if (row0.activitiesId){
        activities = results.data.map(row => ({
        id: row.activitiesId,
        name: row.activityName,
        description: row.description,
        location: row.location,
        keyInfo_id: row.keyInfo_id,
        votes: row.votes
        }));
    } 
    let user = {
        id: row0.userId,
        username: row0.username,
        activities
    }
    return user;
}


/**
 * Get all users
 **/
router.get('/', async function (req, res, next) {
     try {
        sendAllUsers(res);
    } catch(err) {
        res.status(500).send({ error: err.message });
    }
})

//Get user by id
router.get('/:id', ensureUserExists, async function(req, res, next) {
    let user = res.locals.user;
    try {
        let sql = `
        SELECT users.*, activities.*, users.id AS userId, activities.activities_id AS activitiesId
        FROM users
        LEFT JOIN users_activities ON users.id = users_activities.userId
        LEFT JOIN activities ON users_activities.activitiesId = activities.activities_id
        WHERE users.id = ${user.id}
        `;
        let results = await db(sql);
        user = joinToJson(results);

        res.send(user);
    } catch(err) {
        res.status(500).send({ error: err.message });
    }
})

module.exports = router;