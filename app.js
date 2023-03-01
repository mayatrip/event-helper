var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var eventRouter = require('./routes/events');
var votingRouter = require('./routes/voting');

const cors = require('cors');  // add at the top

var app = express();

app.use(cors());  // add after 'app' is created which is express

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/events', eventRouter);
app.use('/voting', votingRouter);



module.exports = app;
