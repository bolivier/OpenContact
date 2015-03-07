var mongoose = require("mongoose");

var personSchema =  new mongoose.Schema( {
  name: String,
  email: String,
  address: String,
  phone: String,
  notes: [ {
    dateCreated: Date,
    text: String
  }]
} );

mongoose.model('Person', personSchema);
