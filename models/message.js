'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = Schema({
    created_at: String,
    text: String,
    status: Boolean
});

module.exports = mongoose.model( 'Message', MessageSchema );