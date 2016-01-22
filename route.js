var express = require('express');
var Parse = require('parse/node').Parse;
var router = express.Router();
var _ = require('lodash');
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');


Parse.initialize('YMg0IjOSRw7FupnNTBZXs2LoiGxjcP4B5ruqOhYt', 'yfJ32G79PwYL0S1rjj8GsrjUCy0U7rQggAj742SA');
var MenuItem = Parse.Object.extend('MenuItem');


// define routes
var toDoItems = [
  		{id: 1, firstName: "Shiva", lastName: "Durgam"},
  		{id: 2, firstName: "Krishna", lastName: "Reddy"},
  		{id: 3, firstName: "Durgam", lastName: "Chetty"}
  	];
router.get('/', function (request, response) {
  if(!request.session.visitcount){
    request.session.visitcount = 1;
  } else {
    request.session.visitcount ++;
  }
  console.log(request.session);
  response.render('home', {
    title: 'Paradise Biryanai Point',
  	items: toDoItems,
  });
});

router.get('/index', function (request, response) {
  response.render('index', {
  	title: 'Paradise Biryani Point  ',
  	items: toDoItems,
  });
});

router.post('/signup', function(request, response){
    var user = new Parse.User();
    var username = request.body.username;
    var password = request.body.password;

    user.set("username", username);
    user.set("password", password);

    // other fields can be set just like with Parse.Object

    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        console.log("successfully registered");
        request.flash('info', 'successfully registered')
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        console.log("Error " + error.code + " : " + error.message);
        request.flash('error', 'signup failed')
      }
    });
    response.render('home', {
      locals: request.flash(),
      title: 'Paradise Biryanai Point',
    	items: toDoItems
    });
});

router.post('/login', function(request, response){
    var username = request.body.username;
    var password = request.body.password;
    Parse.User.logIn(username, password, {
      success: function(user) {
        console.log(username + " logged in successfully!! " );
      },
      error: function(user,error){
        console.log("Error " + error.code + " : " + error.message);
      }
    });
      response.redirect('/');
});

router.get('/addItem', function(request, response){
  var menuItem = new MenuItem();
  menuItem.save({
    title: "Chicken Biryani",
    price: 12.5
  }).then(function (response) { console.log(menuItem.price); });
  response.send("hi");
});

router.get('/results', function(request, response){
  var query = new Parse.Query(MenuItem);
  query.equalTo("title", "Chicken Biryani");

  query.find({
    success: function (response) {
      console.log(response);
    }
  });
  response.send('Hello World!');
});

router.post('/add', function(request, response){
  var a = request.body.newItemFirstName;
  var b = request.body.newItemLastName;
  toDoItems.push({
    id:        toDoItems.length+1,
    firstName: _.startCase(a),
    lastName:  _.startCase(b)
  });
  response.redirect('/');
});

router.get('/delete/:index', function(request, response){
  if(request.params.index != ''){
    toDoItems.splice(request.params.index,1)
  };
  response.redirect('/');
})

router.get('/edit/:index', function(request, response){
  response.render('edit',{
    title: 'My first App',
    item: toDoItems[request.params.index]
  });
});

router.post('/update/:id', function(request, response){
  var a = request.body.newItemFirstName;
  var b = request.body.newItemLastName;
  toDoItems[request.params.id].firstName = _.startCase(a);
  toDoItems[request.params.id].lastName = _.startCase(b);
  response.redirect('/');
});

module.exports = router;
