var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    /*auth: {
        user: 'info.keystonebooks@gmail.com',
        pass: 'keystone@123'
    }*/
    auth: {
        user: 'nag6911@gmail.com',
        pass: 'nagesh@123'
    }
});

var mongo = require('mongodb');
var monk = require('monk');
//var db = monk('localhost:27017/bookstore'); // Local machine/ Production

var db = monk('sirivalli:sweety1234@ds155841.mlab.com:55841/register');




var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var login = require('./routes/login');
var changepassword = require('./routes/changepassword');
var updateprofile = require('./routes/updateprofile');
var forgotpassword = require('./routes/forgotpassword');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
console.log('server running at 3002');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//Variables
app.locals.fromEmailId = 'nag6911@gmail.com';  // from email for all mails 
app.locals.fromName = 'SIRIVALLI-VALLURUPALLI'; 


// Make our db accessible to our router
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
   // res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    req.db = db;
    req.transporter = transporter;
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/register', register);
app.use('/login', login);
app.use('/changepassword', changepassword);
app.use('/updateprofile', updateprofile);
app.use('/forgotpassword', forgotpassword);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
