'use strict';

var _ = require('lodash');

/**
 * Load environment configuration
 */
var environment = process.env.NODE_ENV || "development";
module.exports = _.merge(
    require('./env/all.js'),
    require('./env/' + environment  + '.js'));