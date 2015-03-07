var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// --- method overriding ---
var methodOverride = require('method-override');
app.use(methodOverride());

// --- body-parser ---
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// --- Models ---
require('./models/organization');
require('./models/person');

// --- router ---
var router = require('./routes');
app.use('/', router);

// --- Mongo --- 
var mongoUri = process.env.MONGOLAB_URI ||
			process.env.MONGOHQ_URL ||
			'mongodb://localhost/open-contact';
console.log("mongoUri = ", mongoUri);
mongoose.connect(mongoUri);

var server = app.listen(3000, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Open Contact app listening at http://%s:%s', host, port);

});
