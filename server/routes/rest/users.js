var express = require('express')
  , router = express.Router()
  , mongoose = require('mongoose');  
  
var User = require('../../models/User/User'); 

/* GET /users listing. */
router.get('/', function(req, res, next) {
  User.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* GET /user/current : get auth user infos*/
router.get('/current', function(req, res, next) {
	//get user from passport
	res.json(req.user);
});

/* GET /user/:id : get user id infos*/
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST / create user : create user */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
	console.log(req.body);
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /user/:id : update user id infos*/
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /user/:id : delete user id*/
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;