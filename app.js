process.env.NODE_CONFIG_DIR = __dirname + '/config/';
var config = require('config');
var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('./database/index');
var routes = require('./routes/index');
var users = require('./routes/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var stores = require('./routes/store');

var app = express();

//passprt config
var User = require('./models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// function auth (req, res, next) {
//   console.log(req.headers);
//
//   var authHeader = req.headers.authorization;
//   if(!authHeader) {
//     var err = new Error('Not Authenticated!');
//     err.status = 401;
//     next(err);
//     return;
//   }
//
//   var auth = new Buffer(authHeader.split(' ')[1],
//   'base64').toString().split(':');
//
//    var user = auth[0];
//    var pass = auth[1];
//
//    //// This is just a dummy example
//    if(user == 'admin') && pass == 'password'){
//      next();
//    } else{
//      var err = new Error('Not Authenticated!');
//      err.status = 401;
//      next(err);
//    }
// }
//
// app.use(auth);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.set('port', process.env.PORT || config.get('port'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/store', stores);




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
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


http.createServer(app).listen(app.get('port'), function () {
  var db = mongoose.connection;
  db.on('error', console.error.bind(console,'connection error: '));
  db.once('open', function(){
    console.log('***********************************************');
    console.log("*     Connected to database!                  *");
    console.log('*     server listening on port ' + app.get('port')+' *');
    console.log('***********************************************');

  });


});

module.exports = app;
