'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foods = require('food.js');
var tags = require('tags.js');

var MealSchema = new Schema({
    mealId: Number,
    mealName: String,
    mealItems:[{"food": foods.FoodSchema, "amount": Number}],
    mealTags: [tags.TagSchema]
  }
);

exports.MealSchema = MealSchema;
module.exports = mongoose.model('Meal',MealSchema);