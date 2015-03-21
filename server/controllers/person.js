/*
 * Person Controller
 */
var _ = require("lodash");
var mongoose = require("mongoose");
var Person = mongoose.model('Person');

var personController = {};

personController.getAll = function (req, res, next) {
	Person.find({ })
		.exec(function (err, people) {
			if (err) {res.send(err);}
			res.send(people);
		});
};

personController.createPerson = function (req, res, next) {
	var personParams = {
	 	name: req.body.name,
	 	phone: req.body.phone,
	 	email: req.body.email,
	 	address: req.body.address
	};
	var newPerson = new Person(personParams);
	newPerson.save();
	res.send();
};

module.exports = personController;
