var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET event listing. */
router.get('/', async function(req, res, next) {

  try {
    let result = await db('SELECT activities.keyInfo_id, date, title, deadline, id, activityName, description, price, link, location FROM activities INNER JOIN keyInfo ON keyInfo.keyInfo_id = activities.keyInfo_id ');
    let event = result.data;
    res.send(event);
  }catch (err) {
    res.status(500).send({error: err.message});
  }

});

/* POST a new acitvity */
router.post("/", async function (req, res, next) {
  //get the texts from the body
  console.log(req.body);
  let {keyInfo} = req.body;
  let {date, title, deadline, activityOne, activityTwo} = keyInfo;
  let {activityName, description, price, link, location } = activityOne;
  let {activityNameTwo: actTwoName, descriptionTwo: descTwo, priceTwo: priceTwo, linkTwo: linkTwo, locationTwo: locTwo } = activityTwo;

  let insertKeyInfo = `
  INSERT INTO keyInfo (date, title, deadline)
  VALUES ('${date}', '${title}', '${deadline}')`;

  try {
    //add new activities input
    let keyInfoResult = await db(insertKeyInfo);
    //create a new activities in my table only after I have my primary keyInfo being created
    const insertActivities = `
    INSERT INTO activities (activityName, description, price, link, location, keyInfo_id)
    VALUES 
    ('${activityName}', '${description}', ${price}, '${link}', '${location}', ${keyInfoResult.data[0].insertId}),
    ('${actTwoName}', '${descTwo}', ${priceTwo}, '${linkTwo}', '${locTwo}', ${keyInfoResult.data[0].insertId})`;
    keyInfoResult = await db(insertActivities);
    //TO FIGURE OUT HOW TO NOT HAVE THE KEYINFO TWICE IN MY KEYINFO TABLE?

    res.status(200).send(keyInfoResult);

  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

module.exports = router;
