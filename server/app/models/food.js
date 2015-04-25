'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var measure = require('../models/measure.js');
var category = require('../models/category.js');

var FoodSchema = new Schema({
    foodId: Number,
    foodName: String,
    foodType: String, //food or recipe
    foodCategories: [category.CategorySchema],
    foodMeasures:[measure.MeasureSchema]
  }
);

exports.FoodSchema = FoodSchema;
// create the model for Food and expose it to our app
module.exports = mongoose.model('Food',FoodSchema);