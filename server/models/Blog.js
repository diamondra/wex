var mongoose = require('mongoose');
var BlogSchema = new mongoose.Schema({
  description: String,
  updated_at: { type: Date, default: Date.now },
  owner: {type : mongoose.Schema.Types.ObjectId, ref : 'Person' }
});
module.exports = mongoose.model('Blog', BlogSchema);
