var mongoose = require('mongoose');
var TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
  owner : {type : mongoose.Schema.Types.ObjectId, ref : 'User' }
});
module.exports = mongoose.model('Todo', TodoSchema);
