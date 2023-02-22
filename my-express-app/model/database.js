require("dotenv").config();
const mysql = require("mysql");
// const fs = require("fs");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "event",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  // let sql = "DROP TABLE if exists activities; CREATE TABLE item(id INT NOT NULL AUTO_INCREMENT, text VARCHAR(40) not null, complete BOOLEAN, PRIMARY KEY (id));";
  // let sql = fs.readFileSync(__dirname+"/init_db.sql").toString();

    let sql = "DROP TABLE if exists activities; CREATE TABLE event(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, date VARCHAR(50) NOT NULL, title VARCHAR(50) NOT NULL, deadline VARCHAR(50) NOT NULL, activityName VARCHAR(50) NOT NULL, description VARCHAR(100) NOT NULL, price INT NOT NULL, link VARCHAR(65535), location VARCHAR(50));";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `activities` was successful!");

    console.log("Closing...");
  });

  con.end();
});


