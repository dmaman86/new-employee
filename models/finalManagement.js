'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FinalManagement = Schema({
    numberWeek: String,
    year: String,
    sunday: {
        morning: [],
        afternoon: [],
        night: []
    },
    monday: {
        morning: [],
        afternoon: [],
        night: []
    },
    tuesday: {
        morning: [],
        afternoon: [],
        night: []
    },
    wednesday: {
        morning: [],
        afternoon: [],
        night: []
    },
    thursday: {
        morning: [],
        afternoon: [],
        night: []
    },
    friday: {
        morning: [],
        afternoon: [],
        night: []
    },
    saturday: {
        morning: [],
        afternoon: [],
        night: []
    }
})

module.exports = mongoose.model( 'FinalManagement', FinalManagement );