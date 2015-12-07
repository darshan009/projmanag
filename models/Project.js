var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  name : String,
  moderator : [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
  admin: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
});
module.exports = mongoose.model('Project', projectSchema);
