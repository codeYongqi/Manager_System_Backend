var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/Employee');
var manageRouter = require('./routes/Manager')
var teamRouter = require('./routes/Team');
const session = require('express-session');
const { buildError } = require('./utils/jsonUtils');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    name: 'loginKey',
    secret: 'manage-system',
    resave: true,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 3600 * 24 * 1
    }
}))

app.use('/employee', usersRouter);
app.use('/manager', manageRouter)
app.use('/team', teamRouter)

app.use(function (req, res, next) {
        res.status(404).json( buildError(404, 'Not found'));
    }
)

module.exports = app;
