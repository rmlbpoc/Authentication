'use strict';
// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({
    tagName:String,
    tagType:String
  }
);
