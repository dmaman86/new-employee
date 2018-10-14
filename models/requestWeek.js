'use strict'

var mongoose = require('mongoose');
var uniqueValidated = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var RequestWeek = Schema({
    method: {
        type: String,
        required: [true, 'Method is required']
    },
    morning: {
        type: String,
        required: [true, 'Values of morning is required']
    },
    afternoon: {
        type: String,
        required: [true, 'Values of afternoon is required']
    },
    night: {
        type: String,
        required: [true, 'Values of night is required']
    },
    weekend: {
        type: String
    }
});

module.exports = mongoose.model( 'RequestWeek', RequestWeek );