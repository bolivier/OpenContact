var Constants = require('../Constants');
var Dispatcher = require('../Dispatcher');

var ServerActions = {};

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

ServerActions.loadOrgs = function () {
	Dispatcher.handleServerAction({
		type: Constants.ORGS_LOADED,
		data: [
			{ id: '123', name: 'Austin High' },
			{ id: '124', name: 'Bowie Middle' },
			{ id: '125', name: 'Smith Elementary' },
			{ id: '126', name: 'Kirk Junior Academy' }
		]
	});
};


/*ServerActions.loadPeople = function () {
	$.get('/people', function(people) {
		Dispatcher.handleServerAction({
			type: Constants.PEOPLE_LOADED,
			data: people
		});
	}
};

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
