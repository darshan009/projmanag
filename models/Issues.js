var mongoose = require('mongoose');

var issuesSchema = new mongoose.Schema({
  name : String,
  description: String,
  creator : [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
  projectId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
  timestamp: { type : Date, default: Date.now }
});
module.exports = mongoose.model('Issues', issuesSchema);
