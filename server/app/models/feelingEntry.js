'use strict';

var mongoose = require('mongoose');

var FeelingEntrySchema = new mongoose.Schema({
    userId: String,
    feelingDate: Date,
    feelingTimeOfDay: String,
    feelingValue: String
  }
);

module.exports = mongoose.model('FeelingEntry',FeelingEntrySchema);