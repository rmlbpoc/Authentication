'use strict';

var mongoose = require('mongoose');

var FeelingEntrySchema = new mongoose.Schema({
    userId: String,
    feelingDate: Date,
    feelingTimeOfDay: String,
    feelingValue: { type: String, enum: ['great', 'full', 'tired'] }
  }
);
FeelingEntrySchema.index({ unique: true });
module.exports = mongoose.model('FeelingEntry',FeelingEntrySchema);