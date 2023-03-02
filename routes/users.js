var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");


/**
 * Get all users
 **/

router.get('/', async function (req, res, next) {
    let sql = `SELECT * FROM users`;

    try {
        let results = await db(sql);
        let users = results.data;
        users.forEach(u => delete u.password);
        res.send(users);
    } catch(err) {
        res.status(500).send({ error: err.message });
    }
})

module.exports = router;