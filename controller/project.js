var User = require('../models/User');
var Project = require('../models/Project');

exports.getProject = function(req, res){
  res.render('createProject');
};
exports.postProject = function(req, res){
    var project = new Project({
      name: req.body.name,
      admin: req.user._id
    });
    project.save();
    res.redirect('/projects');
};

exports.getAllProject = function(req, res){
  res.render('project');
};
exports.getAllProject = function(req,res){
  Project.find({}, function(err, projects){
    if(err)
      return next(err);
    res.render('project',{projects: projects});
  });
};
