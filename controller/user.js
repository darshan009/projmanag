var passport = require('passport');
var User = require('../models/User');

//check if user is logged in
exports.isLogged = function(req, res, next){
  var user = 1;
  if(user)
  {
    next();
  }
  else
    res.render('login');
};

//add user
exports.getAddUser=function(req,res){
    res.render('create');
};
exports.postAddUser = function(req, res){
    var user = new User({
      username: req.body.username,
      password: req.body.password
    });
  user.save();
  res.redirect('/users/create');
};

//login
exports.getLogin = function(req, res, next){
  res.render('login');
};
exports.postLogin = function(req, res, next){
    passport.authenticate('local', function(err, user, info){
      if (err)
        return next(err);
      if(!user)
      {
        console.log("user to login");
        res.redirect('/login',{message: info.message});
      }
      req.logIn(user,function(err){
        if(err)
          return next(err);
        res.redirect('/');
      });
    })(req, res, next);
};

exports.getLogout = function(req, res, next){
  req.logout();
  res.redirect('/');
};
