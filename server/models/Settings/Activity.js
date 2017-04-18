var mongoose = require('mongoose');
var ActivitySchema = new mongoose.Schema({
  name: String,
  updated_at: { type: Date, default: Date.now },
  project_type : {type : mongoose.Schema.Types.ObjectId, ref : 'ProjectType' },
  reports : [{arid:String, value:Number}]
});
module.exports = mongoose.model('Activity', ActivitySchema);
