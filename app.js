var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
var request = require('request');
var session = require('express-session');
///var flarum = require('node-flarum');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


require('./models/Book');
require('./models/Map');
require('./models/Term');
require('./models/Question');
require('./models/Quiz');
require('./models/User');
require('./models/Biz');
require('./models/Infographer');
require('./models/Lawyer');
require('./models/Tutor');
require('./config/passport');
require('./models/Car');
require('./models/FirmComment');
require('./models/Inbox');
require('./models/VContact');
require('./models/BookCategory');
require('./models/BookLanguage');
require('./models/QuizCategory');
require('./models/QuizLanguage');
require('./models/BizComment');
require('./models/VContact');
require('./models/Inbox');
require('./models/Teenager');
require('./models/UContact');
require('./models/Payment');

 
//mongoose.connect("mongodb://mhadi:mhadi85@ec2-54-183-149-25.us-west-1.compute.amazonaws.com:27017/dmvDB");

mongoose.connect("mongodb://mhadi:mhadi85@ec2-54-183-254-91.us-west-1.compute.amazonaws.com:27017/cdlDB");


var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(cors());
app.use(session({ resave: true ,secret: '12345_SECRET' , saveUninitialized: true}));

app.use('/', routes);
app.use('/new_quiz',routes);
app.use('/save_quiz',routes);
app.use('/all_quiz',routes);


app.use('/auth/facebook',routes);
app.use('/auth/google',routes);

app.use("/test_route",routes);
app.use("/execute_card",routes);
app.use("/cancel_card",routes);

//app.use('/forum',flarum);
//app.use(flarum);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
