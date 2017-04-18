var mongoose = require('mongoose');
var ProjectTypeSchema = new mongoose.Schema({
  name: String,
  updated_at: { type: Date, default: Date.now },
  activities: [{type : mongoose.Schema.Types.ObjectId, ref : 'Activity' }]
});
module.exports = mongoose.model('ProjectType', ProjectTypeSchema);
