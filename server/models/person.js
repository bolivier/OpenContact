var mongoose = require("mongoose");

var personSchema =  {
    name: String,
    email: String,
    address: String,
    phone: String,
    notes: [ {
        dateCreated: Date,
        text: String
    }]
};

mongoose.model('Person', personSchema);
