var mongoose = require('mongoose');
var ProjectTypeSchema = new mongoose.Schema({
  name: String,
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('ProjectType', ProjectTypeSchema);