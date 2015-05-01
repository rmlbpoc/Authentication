'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MealSchema = new Schema({
    mealId: Number,
    mealName: String,
    mealItems:[{type: Schema.ObjectId, ref: 'Food'}]
  }
);

exports.MealSchema = MealSchema;
module.exports = mongoose.model('Meal',MealSchema);