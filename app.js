var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/Employee');
var manageRouter = require('./routes/Manager')
var teamRouter = require('./routes/Team');
const { selectEmployeeByInfo } = require('./model/employeeModel');
const { buildSuccess } = require('./utils/jsonUtils');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

async function login(req, res, next) {
    const result = await selectEmployeeByInfo(req.body)
    console.log(result)
    if(result.length == 1){
        req.login_level = 1
    }
    next()
}
// app.use('/employee', login)

// app.use('/', indexRouter);
app.use('/employee', usersRouter);
app.use('/manager', manageRouter)
app.use('/team', teamRouter)

module.exports = app;
