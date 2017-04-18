var express = require('express')
,   router = express.Router();

router.use('/todo', require('./todos'));
router.use('/user', require('./users'));
router.use('/role', require('./roles'));
router.use('/client', require('./clients'));
router.use('/project', require('./projects'));
router.use('/projecttype', require('./projecttype'));
router.use('/activity', require('./activity'));
router.use('/assignment', require('./assignment'));
router.use('/activityreport', require('./activityreport'));

router.use('/person', require('./person'));
router.use('/blog', require('./blog'));

module.exports = router;
