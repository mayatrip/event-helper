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
  //I think I need to do something like select and join to have everything in the req.body
  let {date, title, deadline, activityName, description, price, link, location} = req.body;

  let insertKeyInfo = `
  INSERT INTO keyInfo(date, title, deadline)
  VALUES ('${date}', '${title}', '${deadline}')`;

  let insertActivityOne = `
  INSERT INTO activities (activityName, description, price, link, location)
  VALUES ('${activityName}', '${description}', '${price}', '${link}', '${location}')`;
  
  let insertActivityTwo = `
  INSERT INTO activities (activityName, description, price, link, location)
  VALUES ('${activityName}', '${description}', '${price}', '${link}', '${location}')
  `;

  try {
    //add new activity
    await db(insertKeyInfo);
    await db(insertActivityOne);
    await db(insertActivityTwo);

    let result = await db('SELECT * FROM event');
    let event = result.data;

    res.status(200).send(event);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

module.exports = router;
