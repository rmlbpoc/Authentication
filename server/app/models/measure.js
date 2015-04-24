'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.MeasureSchema = new Schema({
  measureId: Number,
  measureName: String
});

//module.exports = mongoose.model('Measure',MeasureSchema);