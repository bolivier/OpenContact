var mongoose = require("mongoose");
var personSchema = require("person").personSchema;



var organizationSchema = {
	name: String,
  address: String,
  phone: String,
  email: String,
  people: [ personSchema ],
  years: [ Number ]
};

mongoose.model('Orgaization', organizationSchema);
