var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST a new acitvity */
router.post("/", async (req, res, next) => {
  //get the texts from the body
  let {date, title, deadline, activityName, description, price, link, location} = req.body;
  let sql = `
  INSERT INTO event (date, title, deadline, activityName, description, price, link, location)
  VALUES ('${date}', '${title}', '${deadline}', '${activityName}', '${description}', '${price}', '${link}', '${location}')
  `;

  try {
    //add new activity
    await db(sql);
    let result = await db('SELECT * FROM event');
    let event = result.data;

    res.status(200).send(event);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

module.exports = router;
