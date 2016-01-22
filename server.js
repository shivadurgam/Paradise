var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');



//configure app
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('bower_components'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({resave:true, saveUninitialized:true, secret:'dingdong'}));
app.use(flash());

// defining routes
app.use(require('./route'));

//start server
var port = process.env.PORT || 3000;
app.listen(port,function(){
  console.log('ready on port ' + port)
});
