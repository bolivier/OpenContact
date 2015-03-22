/*
 * Person Controller
 */
var _ = require('lodash');
var mongoose = require('mongoose');
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
	 	address: req.body.address,
	 	notes: req.body.notes ? req.body.notes : []
	};
	var newPerson = new Person(personParams);
	newPerson.save(function(err, p) {
		if (err) {res.send(err);}
		res.send(p);
	});
};

personController.update = function (req, res, next) {
	var personParams = {
	 	name: req.body.name,
	 	phone: req.body.phone,
	 	email: req.body.email,
	 	address: req.body.address,
	 	notes: req.body.notes ? req.body.notes : []
	};
	var oldId = req.body._id;
	delete req.body._id;
	Person.update({_id: req.params.id}, {'$set': req.body}, function() {
		req.body._id = oldId;
		res.send(req.body);
	});
};

personController.deletePerson = function (req, res, next) {
	Person.remove({_id: req.params.id}, true);
	res.send();
};

module.exports = personController;
