var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET event listing. */
router.get('/', async function(req, res, next) {

  try {
    let result = await db('SELECT activities.keyInfo_id, date, title, deadline, activities_id, activityName, description, price, location FROM activities INNER JOIN keyInfo ON keyInfo.keyInfo_id = activities.keyInfo_id');
    
    let event = result.data;
    res.send(event);
  }catch (err) {
    res.status(500).send({error: err.message});
  }
});

/* GET event listing by ID */
router.get('/:keyInfo_id', async function (req, res, next) {
  let { keyInfo_id } = req.params;

  try {
    let result = await db(`SELECT activities.keyInfo_id, date, title, deadline, activities_id, activityName, description, price, location FROM activities INNER JOIN keyInfo ON keyInfo.keyInfo_id = activities.keyInfo_id WHERE keyInfo.keyInfo_id = ${keyInfo_id} `);

    let event = result.data;
    if (event.length !== 0) {
      res.send(event);
    } else {
      // event array is empty... no event found
      res.status(404).send({ error: 'Event not found' });
    }
  }catch (err) {
    res.status(500).send({error: err.message});
  }
});

/* POST a new acitvity */
router.post("/", async function (req, res, next) {
  //get the texts from the body
  console.log(req.body);
  let { date, title, deadline, activityNameOne, descriptionOne, priceOne, locationOne, activityNameTwo, descriptionTwo, priceTwo, locationTwo }= req.body;

  let insertKeyInfo = `
  INSERT INTO keyInfo (date, title, deadline)
  VALUES ('${date}', '${title}', '${deadline}')`;

  try {
    //add new activities input
    let keyInfoResult = await db(insertKeyInfo);
    //create a new activities in my table only after I have my primary keyInfo being created
    const insertActivities = `
    INSERT INTO activities (activityName, description, price, location, keyInfo_id)
    VALUES 
    ('${activityNameOne}', '${descriptionOne}', ${priceOne}, '${locationOne}', '${keyInfoResult.data[0].insertId}'),
    ('${activityNameTwo}', '${descriptionTwo}', ${priceTwo}, '${locationTwo}', '${keyInfoResult.data[0].insertId}')`;
    keyInfoResult = await db(insertActivities);



    res.status(200).send(keyInfoResult);

  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

module.exports = router;
