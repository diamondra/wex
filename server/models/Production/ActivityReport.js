var mongoose = require('mongoose');
var ActivityReportSchema = new mongoose.Schema({
  activity: {type : mongoose.Schema.Types.ObjectId, ref : 'Activity' },
  user: {type : mongoose.Schema.Types.ObjectId, ref : 'User' },
  project: {type : mongoose.Schema.Types.ObjectId, ref : 'Project' },
  hours: { type: Number },
  dt_activity : { type: Date},
});
module.exports = mongoose.model('ActivityReport', ActivityReportSchema);
