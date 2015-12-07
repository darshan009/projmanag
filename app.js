var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var passportConf = require('./config/passport');
var MongoStore = require('connect-mongo')(session);

var app = express();

var userController = require('./controller/user');
var homeController = require('./controller/home');
var projectController = require('./controller/project');
//db connect
mongoose.connect("mongodb://localhost:27017/projmanag");
mongoose.connection.on('error',function(){
  console.log("Mongo Error in connection");
});
mongoose.connection.on('sucess',function(){
  console.log("Mongo connected");
});

app.set('views',__dirname+"/views");
app.set('view engine','jade');
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
//session
app.use(cookieParser());
app.use(express.static(__dirname+'/public'));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "2hjkeydwjfhusdifsb",
  store: new MongoStore({
    url:"mongodb://localhost:27017/projmanag",
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser= req.user;
  next();
});

app.get('/', homeController.getHome);
//routes for users
app.get('/users/create', userController.getAddUser);
app.post('/users/create', userController.postAddUser);
app.get('/users/login', userController.getLogin);
app.post('/users/login', userController.postLogin);
app.get('/logout', userController.getLogout);
//routes for projects
app.get('/projects', projectController.getAllProject);
app.get('/projects/create', projectController.getProject);
app.post('/projects/create', projectController.postProject);

app.listen('3000', function(){
  console.log("Server at port 3000");
});
