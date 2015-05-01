'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var food = require('../models/food.js');
var meal = require('../models/meal.js');
var user = require('../models/user.js');

var FoodEntrySchema = new mongoose.Schema({
    entryDate : Date,
    entryTimeOfDay: String,
    entryUserId: {type: Schema.ObjectId, ref: 'User'},
    _foodId : {type: Schema.ObjectId, ref: 'Food'},
    _mealId : {type: Schema.ObjectId, ref: 'Meal'},
    entryAmount : Number
  }
);

module.exports = mongoose.model('FoodEntry',FoodEntrySchema);