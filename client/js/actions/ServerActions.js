var Constants = require('../Constants');
var Dispatcher = require('../Dispatcher');
var Store = require('../stores/Store'); // Might break FLUX paradigm

var ServerActions = {};

/*
ServerActions.loadPeople = function () {
	Dispatcher.handleServerAction({
		type: Constants.PEOPLE_LOADED,
		data: [
			{ id: '223', name: 'Smith Johnson' },
			{ id: '224', name: 'Manny Man' },
			{ id: '225', name: 'John Smith' },
			{ id: '226', name: 'Albert Einstein' },
			{ id: '227', name: 'Max Planck' },
			{ id: '228', name: 'Arnie Reinhold' },
			{ id: '229', name: 'Frodo Baggins' },
			{ id: '230', name: 'Bilbo Baggins' },
			{ id: '231', name: 'Samwise Gamgee' },
			{ id: '232', name: 'Legolas Greenleaf' },
			{ id: '243', name: 'Smith Johnson' },
			{ id: '244', name: 'Manny Man' },
			{ id: '245', name: 'John Smith' },
			{ id: '246', name: 'Albert Einstein' },
			{ id: '247', name: 'Max Planck' },
			{ id: '248', name: 'Arnie Reinhold' },
			{ id: '249', name: 'Frodo Baggins' },
			{ id: '240', name: 'Bilbo Baggins' },
			{ id: '241', name: 'Samwise Gamgee' },
			{ id: '242', name: 'Legolas Greenleaf' }
		]
	});
};
*/
ServerActions.loadOrgs = function () {
	Dispatcher.handleServerAction({
		type: Constants.ORGS_LOADED,
		data: [
			{ _id: '123', name: 'Austin High' },
			{ _id: '124', name: 'Bowie Middle' },
			{ _id: '125', name: 'Smith Elementary' },
			{ _id: '126', name: 'Kirk Junior Academy' }
		]
	});
};


ServerActions.loadPeople = function () {
	$.get('/api/people', function(people) {
		Dispatcher.handleServerAction({
			type: Constants.PEOPLE_LOADED,
			data: people
		});
	});
};

ServerActions.deletePerson = function(personObject) {
	$.ajax({
		url: '/api/people/' + personObject._id,
		method: 'DELETE'
	}).done(function() {
		var people = Store.getSortedPeople();
		var newPeople = people.filter(function(item) {
			return item._id != personObject._id;
		});

		// Local Update
		Dispatcher.handleServerAction({
			type: Constants.PEOPLE_LOADED,
			data: newPeople
		});
	});
};

ServerActions.savePerson = function(personObject) {
	function spliceIn(list, newObject) {
		return _.map(list, function(item) {
			return item._id == newObject._id ? personObject : item;
		});
	}

	if (personObject._id) {
		$.ajax({
			url: '/api/people/' + personObject._id,
			method: 'PUT',
			data: personObject
		}).done(function(updatedPerson) {
			// Local Update
			Dispatcher.handleServerAction({
				type: Constants.PEOPLE_LOADED,
				data: spliceIn(Store.getSortedPeople(), updatedPerson)
			});
		});
	} else {
		$.ajax({
			url: '/api/people/',
			method: 'POST',
			data: personObject
		}).done(function(newPerson) {
			// Splice with null value
			var spliced = spliceIn(Store.getSortedPeople(), personObject);
			personObject._id = newPerson._id; // Now slip in the ID

			// Local Update
			Dispatcher.handleServerAction({
				type: Constants.PEOPLE_LOADED,
				data: spliced
			});
		});
	}
};
/*
ServerActions.loadOrgs = function () {
	$.get('/orgs', function(orgs) {
		Dispatcher.handleServerAction({
			type: Constants.ORGS_LOADED,
			data: orgs
		});
	});
};
*/

module.exports = ServerActions;
