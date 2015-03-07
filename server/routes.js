/*global module */
/*
 * routing information
 */
var express = require('express');
var router = express.Router();

var Person = require('./controllers/person');
var Organization = require('./controllers/organization');

send = function(req, res) {
	res.send(res.locals.content);
};

router.get ('/', function (req, res) {
	res.send('Hello World!');
});

// People
router.get('/people', Person.getAll); 
router.post('/people', Person.createPerson);
// NOT YET IMPLEMENTED
// router.delete('/people/:id', Person.deletePerson);
// router.put('/people/:id', Person.update);

//Organizations
// NOT YET IMPLEMENTED
// router.get('/orgs');
// router.post('/orgs');
// router.delete('/orgs/:id');
// router.put('/orgs/:id');
// router.get('/orgs/:id/people');
// router.post('/orgs/:id/people');
// router.delete('/orgs/:id/people');

//Export
// NOT YET IMPLEMENTED
// router.get('/export/dump/:year');


// set up the router
module.exports = router;
