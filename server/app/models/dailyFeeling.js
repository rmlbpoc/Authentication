'use strict';

var mongoose = require('mongoose');

var FeelingSchema = new mongoose.Schema({
    userId: String,
    feelingDate: Date,
    feelingTimeOfDay: String,
    feelingValue: String
  }
);