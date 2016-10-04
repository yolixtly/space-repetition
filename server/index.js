var express = require('express');
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var Question = require('./models/Question');
var app = express();

// Question.create({spanish: 'fiesta' }, function(err, question) {
	// console.log(question);
// });
Question.find({}, function(error, questions) {
	console.log(questions);
});


app.use(bodyParser.urlencoded({extended: true}));

var Storage = {
	add: function(spanish, english) {
		var item = {spanish: spanish, english: english, id: this.setId};
		this.items.push(item);
		this.setId += 1;
		return item;
	}
};

var createStorage = function() {
	var storage = Object.create(Storage);
	storage.items = [];
	storage.setId = 1;
	return storage;
}

var storage = createStorage();

storage.add('Hola', 'Hello');
storage.add('Fiesta', 'Party');
storage.add('Noche', 'Night');
storage.add('Muy', 'Very');
storage.add('Bueno', 'Good');
storage.add('Mal', 'Bad');
storage.add('Ocho', 'Eight');
storage.add('Puerta', 'Door');
storage.add('Pollo', 'Chicken');
storage.add('Tonto', 'Silly');

var app = express();
app.use('/', express.static('build'));

app.get('/items/', function(request, response) {
	response.json(storage.items);
});

app.post('/items', bodyParser, function(request, response) {
	if (!('name' in request.body)) {
		return response.sendStatus(400);
	}
	
	var item = storage.add(request.body.name);
	response.status(201).json(item);
});

// app.get('/', function (req, res) {
// 	res.send('Hello World!\n');
// });

app.get('/questions', function(req, res) {
	Question.find(function(err, questions) {
		if (err) {
			return res.status(500).json({message: 'Internal Server Error'
			                            });
		}
		res.json(questions);
	});
});

app.get('/nextq')

app.get('/users', function (req, res) {
	res.send('Yoli\n');
});

app.post('/quotes', (req, res) => {
	res.send(req.body)
});

app.post('/question', function (req, res) {
	res.end('Connection Closed\n\n');
});

// app.get('/gamebaord', function (res, reg) {
// 	res.send(__dirname, '/index.js')
// }) #TODO

var runServer = function(callback) {
	mongoose.connect(config.DATABASE_URL, function(err) {
		if (err && callback) {
			return callback(err);
		}
		
		app.listen(config.PORT, function() {
			console.log('Listening on localhost:' + config.PORT);
			if (callback) {
				callback();
			}
		});
	});
};

if (require.main === module) {
	runServer(function(err) {
		if (err) {
			console.error(err);
		}
	});
};

exports.app = app;
exports.runServer = runServer;

/*
 google Auth - login button (APi)
 Provided term - h3 tag (Get)
 User Answer - input form (post)
 Score : - <span> (get)
 Logout buttn - (api)
 */
