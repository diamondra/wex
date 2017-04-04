/* This file maps your route matches
 * to functions defined in various
 * controller classes
 */
var express = require('express')
  , router = express.Router()

/* require your controllers here */
var indexRouter = require('./index');
var todosRouter = require('./todos');

/* Put routes here */

router.use('/', indexRouter);
router.use('/todo/rest/todo', todosRouter);
