var express = require('express')
  , router = express.Router()
  , passport = require('passport');

router.use('/rest', passport.authenticationRestMiddleware(), require('./rest'));

/* dashboard is auth protected */
router.get('/', passport.authenticationMiddleware(), function(req, res) {
  res.render('index', { user : req.user });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local', {
	successRedirect : '/',
	failureRedirect : '/login'
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

/* ping (test) is auth protected */
router.get('/ping', passport.authenticationMiddleware(), function(req, res){
    res.status(200).send("pong!");
});

module.exports = router
