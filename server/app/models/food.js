'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tags = require('tags.js');

var MeasureSchema = new Schema({
  measureId: Number,
  measureName: String
});

var FoodSchema = new Schema({
    foodId: Number,
    foodName: String,
    foodType: String, //food or recipe
    foodCategory: String,
    tags: [tags.TagSchema],
    defaultMeasure: MeasureSchema,
    foodMeasures:[MeasureSchema]
  }
);

exports.FoodSchema = FoodSchema;
// create the model for Food and expose it to our app
module.exports = mongoose.model('Food',FoodSchema);