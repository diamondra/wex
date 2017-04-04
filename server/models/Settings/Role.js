var mongoose = require('mongoose');
var RoleSchema = new mongoose.Schema({
  name: String,
  updated_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Role', RoleSchema);
