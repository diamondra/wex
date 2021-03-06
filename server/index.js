var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy;

var formDataMiddleware = require('./routes/rest/formDataMiddleware');

var config = require('./config')[(process.env.NODE_ENV || "dev")]; // change env here

var app = express();

// init passport auth strategy
require('./auth').init(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(formDataMiddleware);

app.use(cookieParser());
app.use(session({
  cookieName: 'session',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '..', config.gulp.public)));

var user = require('./models//User/User');

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//set routes here
app.use(require('./routes'));

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