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
  // let {activityName: actTwoName, description: descTwo, price: priceTwo, link: linkTwo, location: locTwo } = activityTwo;

  let insertKeyInfo = `
  INSERT INTO keyInfo (date, title, deadline)
  VALUES ('${date}', '${title}', '${deadline}')`;

  try {
    //add new activity
    const keyInfoResult = await db(insertKeyInfo);
    console.log(insertKeyInfo);
    //create a new activities in my table only after I have my primary keyInfo being created
    let insertActivities = `
    INSERT INTO activities (activityName, description, price, link, location, keyInfo_id)
    VALUES ('${activityName}', '${description}', ${price}, '${link}', '${location}', ${keyInfoResult.data[0].insertId})`;
    await db(insertActivities);

    // let result = await db('SELECT date, title, deadline, activityName, description, price, link, location FROM activities INNER JOIN keyInfo ON activities.keyInfo_id = keyInfo.keyInfo_id ');
    // let event = result.data;

    res.status(200).send(keyInfoResult);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

module.exports = router;
