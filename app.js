var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var MongoStore = require('connect-mongo')(session);
var app = express();

//db connect
mongoose.connect("mongodb://localhost:27017/event");
mongoose.connection.on('error',function(){
  console.log("Mongo Error in connection");
});
mongoose.connection.on('sucess',function(){
  console.log("Mongo connected");
});


app.listen('3000', function(){
  console.log("Server at port 3000");
});
