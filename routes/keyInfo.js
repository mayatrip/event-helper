var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const { ensureLogin } = require('../middleware/guards');

router.get('/', async function(req, res, next) {
    try {
      let result = await db(`SELECT * FROM keyInfo`);
        res.send(result.data);
    } catch (err) {
      res.status(500).send({error: err.message})
    }
  });
  
  router.get('/:id', async function (req, res, next) {
    let id = Number(req.params.id);
    try {
      let result = await db(`SELECT * FROM keyInfo WHERE keyInfo_id = ${id}`);
      if (result.data.length === 0) {
        res.status(404).send({error: 'Event not found'})
      } else {
        res.send(result.data)
      }
    } catch(err) {
      res.status(500).send({error: err.message})
    }
  });

  module.exports = router;