/*
 * Organization Controller
 */
var _ = require('lodash');
var mongoose = require('mongoose');
var Organization = mongoose.model('Organization');

var organizationController = {};

organizationController.getAll = function (req, res, next) {
	Organization.find({ })
		.exec(function (err, orgs) {
			if (err) {res.send(err);}
			res.send(orgs);
		});
};

organizationController.createOrganization = function (req, res, next) {
	var newOrg = new Organization(req.body);
	newOrg.save();
	res.send();
};

module.exports = organizationController;
