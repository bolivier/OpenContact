var Constants = require('../Constants');
var Dispatcher = require('../Dispatcher');
var EventEmitter = require('events').EventEmitter;

var merge = require('react/lib/merge');

var organizations = [];
var people = [];

var currentPerson = -1;
var currentOrganization = -1;

// Cached for performance purposes
var sortedOrgs = [];
var sortedPeople = [];


var Store = merge(EventEmitter.prototype, {
	getSortedOrganizations: function() {
		return sortedOrgs;
	},

	getSortedPeople: function() {
		return sortedPeople;
	},

	getCurrentOrganization: function() {
		return sortedOrgs[currentOrganization];
	},

	createPerson: function() {
		sortedPeople.splice(0, 0, { name: '' });
		currentPerson = 0;
		Store.emitEvent(Constants.PEOPLE_CHANGE_EVENT);
	},

	getCurrentPerson: function() {
		return sortedPeople[currentPerson];
	},

	setCurrentOrganization: function(id) {
		currentOrganization = id;
		Store.emitEvent(Constants.CURRENT_ORG_CHANGE_EVENT);
	},

	setCurrentPerson: function(id) {
		currentPerson = id;
		Store.emitEvent(Constants.CURRENT_PERSON_CHANGE_EVENT);
	},

	emitEvent: function(event) {
		this.emit(event);
	},

	addListener: function(callback, eventType) {
		this.on(eventType, callback);
	},

	removeListener: function(callback, eventType) {
		this.removeListener(eventType, callback);
	}
});

Dispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.type) {
		case Constants.PEOPLE_LOADED:
			people = action.data;
			sortedPeople = _.sortBy(people, function (person) {
				return person.name;
			});
			Store.emitEvent(Constants.PEOPLE_CHANGE_EVENT);
			break;
		case Constants.ORGS_LOADED:
			organizations = action.data;
			sortedOrgs = _.sortBy(organizations, function (org) {
				return org.name;
			});
			Store.emitEvent(Constants.ORGS_CHANGE_EVENT);
			break;
	}
});

module.exports = Store;
