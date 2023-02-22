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
  let {newActivity} = req.body;
  let sql = `
  INSERT INTO items 
  VALUES ('${newActivity})
  `;

  try {
    //add new activity
    await db(sql);
    let results = await db("SELECT * FROM items");
    res.send(results.data);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

module.exports = router;
