/*global module */

/* 
 * routing information
 */
send = function(req, res) {
	res.send(res.locals.content);
};

module.exports = function(app, passport) {
	// require controllers here
	// var session = require('./controllers/session');
	
	//GET
	//app.get('/api/company/:company/:location', company.get, location.get, send);

	//CREATE
	//app.post('/logout', session.postLogout);

	//DELETE
	// app.delete('/api/company/:company/:location', company.get, company.deleteLocation);

	//UPDATE
	// app.put('/api/company/:company/:location', company.get, company.updateLocation);

};
