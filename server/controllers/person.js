/*
 * Person Controller
 */
var _ = require("lodash");
var mongoose = require("mongoose");
var Person = mongoose.model('Person');

var personController = {};

personController.getAll = function (req, res, next) {
	Person.find({  })
		.exec(function (err, people) {
			if (err) {res.send(err);}
			// res.send('this is the people page');
			res.send(people);
		});
};

personController.createPerson = function (req, res, next) {

	console.log('req.body: ', req.body);
	// var personParams = {
	// 	name: req.body.name,
	// 	phone: req.body.phone,
	// 	email: req.body.email,
	// 	address: req.body.address
	// };
	// var newPerson = new Person(personParams);
	// console.log("newPerson = ", newPerson);
  // Person.save();
	// console.log('person saved');
	res.send(req.body);
};

module.exports = personController;
