var mongoose = require('mongoose');
var PersonSchema = new mongoose.Schema({
  name: String,
  updated_at: { type: Date, default: Date.now },
  blogs: [{type : mongoose.Schema.Types.ObjectId, ref : 'Blog' }]
});
module.exports = mongoose.model('Person', PersonSchema);
