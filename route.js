var express = require('express');
var router = express.Router();
var _ = require('lodash');


// define routes

var toDoItems = [
  		{id: 1, firstName: "Shiva", lastName: "Durgam"},
  		{id: 2, firstName: "Krishna", lastName: "Reddy"},
  		{id: 3, firstName: "Durgam", lastName: "Chetty"}
  	];

router.get('/', function (request, response) {
  response.render('home', {
    title: 'Paradise Biryanai Point',
  	items: toDoItems
  });
});

router.get('/index', function (request, response) {
  response.render('index', {
  	title: 'Paradise Biryani Point  ',
  	items: toDoItems
  });
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
