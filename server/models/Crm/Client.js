var mongoose = require('mongoose');
var ClientSchema = new mongoose.Schema({
  name: String,
  is_prospect: Boolean,
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Client', ClientSchema);
