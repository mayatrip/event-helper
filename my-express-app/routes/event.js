var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET event listing. */
router.get('/', async function(req, res, next) {

  try {
    let result = await db('SELECT * FROM event');
    let event = result.data;
    res.send(event);
  }catch (err) {
    res.status(500).send({error: err.message});
  }

});

/* POST a new acitvity */
router.post("/", async function (req, res, next) {
  //get the texts from the body
  let {date, title, deadline, activityName, description, price, link, location} = req.body;
  let sql = `
  INSERT INTO keyInfo(date, title, deadline)
  VALUES ('${date}', '${title}', '${deadline}')

  INSERT INTO activities (activityName, description, price, link, location)
  VALUES ('${activityName}', '${description}', '${price}', '${link}', '${location}')
  
  INSERT INTO activities (activityName, description, price, link, location)
  VALUES ('${activityName}', '${description}', '${price}', '${link}', '${location}')
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
