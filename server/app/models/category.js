'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.CategorySchema = new Schema({
  categoryId: Number,
  categoryType: String,
  categoryName: String
});
