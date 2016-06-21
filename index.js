var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'learn_web_app',
    password : 'password',
    database : 'learn_web_app'
  }
});

var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(function(req, res, next) {

	console.log('URL requested', req.originalUrl);
	next();
});

app.get('/books/delete/:id', function (req, res) {

	var bookId = req.params.id;

	knex.del().from('books').where('id', bookId).then(function(books) {
  		res.redirect('/books');
	}).catch(function(error) {
		console.log(error);
	});
});

app.get('/books/:id', function (req, res) {

	var bookId = req.params.id;

	knex.select().from('books').where('id', bookId).then(function(books) {
  		res.render('home', {
  			books: books
  		});
	}).catch(function(error) {
		console.log(error);
	});
});

app.get('/books', function (req, res) {

	knex.select().from('books').then(function(books) {
  		res.render('home', {
  			books: books
  		});
	}).catch(function(error) {
		console.log(error);
	});
});

app.listen(3000, 'localhost', function () {
  console.log('Example app listening on port 3000!');
});