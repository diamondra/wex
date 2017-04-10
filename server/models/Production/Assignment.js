var mongoose = require('mongoose');
var AssignmentSchema = new mongoose.Schema({
  user : {type : mongoose.Schema.Types.ObjectId, ref : 'User' },
  project : {type : mongoose.Schema.Types.ObjectId, ref : 'Project' },
  dt_start : Date,
  dt_end : Date,
  percent : Number
});
module.exports = mongoose.model('Assignment', AssignmentSchema);
