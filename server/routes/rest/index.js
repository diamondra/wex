var express = require('express')
,   router = express.Router();

router.use('/todo', require('./todos'));
router.use('/user', require('./users'));
router.use('/role', require('./roles'));
router.use('/client', require('./clients'));
router.use('/project', require('./projects'));
router.use('/projecttype', require('./projecttype'));
router.use('/activity', require('./activity'));

module.exports = router;
