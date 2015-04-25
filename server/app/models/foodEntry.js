'use strict';
var mongoose = require('mongoose');
var food = require('food.js');
var meal = require('meal.js');
var user = require('user.js');

var FoodEntrySchema = new mongoose.Schema({
    entryDate : Date,
    entryTimeOfDay: String,
    entryUserId: String,
    entryFoods : [food.FoodSchema],
    entryMeals : [meal.MealSchema],
    entryAmount : Number
  }
);

module.exports = mongoose.model('FoodEntry',FoodEntrySchema);