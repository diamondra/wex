var mongoose = require('mongoose');
var ProjectSchema = new mongoose.Schema({
  name: String,
  updated_at: { type: Date, default: Date.now },
  client : {type : mongoose.Schema.Types.ObjectId, ref : 'Client' },
  project_type : {type : mongoose.Schema.Types.ObjectId, ref : 'ProjectType' }
});
module.exports = mongoose.model('Project', ProjectSchema);
