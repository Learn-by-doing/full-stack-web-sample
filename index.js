var databaseOptions = {
	host: '127.0.0.1',
	port: 3306,
	user: 'learn_web_app',
	password: 'password',
	database: 'learn_web_app'
};

var knex = require('knex')({
	client: 'mysql',
	connection: databaseOptions
});

var bodyParser = require('body-parser');
var express = require('express');
var exphbs  = require('express-handlebars');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
 
var sessionStore = new MySQLStore(databaseOptions);
 
app.use(session({
	key: 'our-cookie',
	secret: 'secret!',
	store: sessionStore,
	resave: false,
	saveUninitialized: true
}));

app.use(function(req, res, next) {

	req.isAuthenticated = function() {
		return !!req.session.user;
	};

	next();
});

function requireAuthentication(req, res, next) {

	if (!req.isAuthenticated()) {
		return res.redirect('/login');
	}

	// The user is logged in.
	// Allow heir request to continue.
	next();
}

app.engine('html', exphbs({
	extname: 'html',
	defaultLayout: 'main'
}));

app.set('view engine', 'html');

app.use(function(req, res, next) {
	console.log('URL requested', req.originalUrl);
	next();
});

app.get('/login', function(req, res) {

	// Show the login page.
	res.render('login');
});

app.get('/logout', function(req, res) {

	if (req.isAuthenticated()) {
		// Destroy their current session to be sure they are logged out.
		// This is important because the session might contain data related to their user account.
		req.session.destroy(function() {
			// Send them to the login page.
			res.redirect('/login');
		});
	} else {
		// They are already logged out.
		// Send them to the login page.
		res.redirect('/login');
	}
});

app.post('/login', function(req, res) {

	if (
		// This is a very simple example of checking a username+password combination.
		// Normally, this information would be stored in a database (like MySQL).
		// Also, the password should be stored only as a hash and not as plaintext.
		// A "hash" is simply a one-way encryption algorithm - meaning it cannot be reversed easily.
		req.body.username === 'test' &&
		req.body.password === 'password123'
	) {
		// Correct username+password.
		// Generate a new session and store their user information in the session data.
		req.session.regenerate(function() {

			req.session.user = {
				username: 'test'
			};

			res.redirect('/books');
		});
	} else {
		// Wrong username/password.
		res.send('Wrong username/password!');
	}
});

app.post('/books', requireAuthentication, function(req, res) {

	knex('books').insert(req.body).then(function(result) {
		res.redirect('/books');
	}).catch(function(error) {
		console.log(error);
	});
});

app.get('/books/delete/:id', requireAuthentication, function(req, res) {

	var bookId = req.params.id;

	knex.del().from('books').where('id', bookId).then(function(books) {
		res.redirect('/books');
	}).catch(function(error) {
		console.log(error);
	});
});

app.get('/books/:id', requireAuthentication, function(req, res) {

	var bookId = req.params.id;

	knex.select().from('books').where('id', bookId).then(function(books) {
		res.render('home', {
			books: books
		});
	}).catch(function(error) {
		console.log(error);
	});
});

app.get('/books', requireAuthentication, function(req, res) {

	knex.select().from('books').then(function(books) {
		res.render('home', {
			books: books
		});
	}).catch(function(error) {
		console.log(error);
	});
});

app.listen(3000, 'localhost', function() {
	console.log('Example app listening on port 3000!');
});

