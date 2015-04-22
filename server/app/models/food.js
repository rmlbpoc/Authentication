'use strict';
// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var tag = require('foodTags.js');

var foodSchema = mongoose.Schema({
    food : {
      name: String,
      type: String,
      category: String,
      tags: String,
      defaultMeasure: String,
      defaultMeasureSize: 1
    }
  }
);