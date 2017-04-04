const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const middleware = require('./middleware');

var md5 = require('md5');

var User = require('../models/User/User');

passport.serializeUser(function (user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
  User.findOne({'username':username}, function (err, user) {
	  cb(null, user);
  });
})

function initPassport () {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({'username':username}, function (err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false)
        }
        if (md5(password) !== user.password  ) {
          return done(null, false)
        }
        return done(null, user)
      })
    }
  ))

  passport.authenticationMiddleware = middleware.authenticationMiddleware;
  passport.authenticationRestMiddleware = middleware.authenticationRestMiddleware;
}

module.exports = initPassport
