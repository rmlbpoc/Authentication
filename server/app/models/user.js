'use strict';
// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        firstName    : String,
        lastName     : String,
        email        : String,
        password     : String,
        resetPasswordToken: String,
        resetPasswordExpires: Date
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    profile          : {
        dateOfBirth  : Date,
        gender       : String,
        heightFt     : String,
        heightIn     : String,
        mobileNumber : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    //console.log('calling validate with '+ password);
    //console.log(bcrypt.hashSync(password, bcrypt.genSaltSync(8), null));
    //console.log(this.local.password);
    //console.log(bcrypt.compareSync(password, this.local.password));
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
