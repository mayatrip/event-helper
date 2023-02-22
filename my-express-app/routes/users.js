var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST a new acitvity */
router.post("/", async (req, res) => {
  //get the texts from the body
  let {id, date, title, deadline} = req.body;
  let sql = `
  INSERT INTO activities (id, date, title, deadline)
  VALUES ('${id}', '${date}', '${title}', '${deadline}')
  `;

  try {
    //add new activity
    await db(sql);
    let results = await db('SELECT * FROM activities');
    res.send(results.data);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

module.exports = router;
