'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var ExerciseSchema = new Schema({
    exerciseId: Number,
    exerciseName: String,
    exerciseType: String,
    category: String,
    tags: [TagSchema]
  }
);

// create the model for Exercise and expose it to our app
module.exports = mongoose.model('Exercise',ExerciseSchema);