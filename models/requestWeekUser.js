'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestWeekUser = Schema({
    emitter: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    numberWeek: String,
    year: String,
    created_at: {
        type: String
    },
    sunday: {
        morning: String,
        afternoon: String,
        night: String
    },
    monday: {
        morning: String,
        afternoon: String,
        night: String
    },
    tuesday: {
        morning: String,
        afternoon: String,
        night: String
    },
    wednesday: {
        morning: String,
        afternoon: String,
        night: String
    },
    thursday: {
        morning: String,
        afternoon: String,
        night: String
    },
    friday: {
        morning: String,
        afternoon: String,
        night: String
    },
    saturday: {
        morning: String,
        afternoon: String,
        night: String
    }
})

module.exports = mongoose.model( 'RequestWeekUser', RequestWeekUser );