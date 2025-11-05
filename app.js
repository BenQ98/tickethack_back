require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./models/connection');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const tripsRouter = require('./routes/trips');
const cartsRouter = require('./routes/carts');
const bookingsRouter = require('./routes/bookings');

var app = express();
const cors = require('cors');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trips', tripsRouter);
app.use('/bookings', bookingsRouter);
app.use('/trips', tripsRouter);

module.exports = app;
