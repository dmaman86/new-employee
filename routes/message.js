'use strict'

var express = require('express');
var MessageCtrl = require('../controllers/message');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/message', md_auth.ensureAuth, MessageCtrl.saveMessage );
api.get('/get-message', md_auth.ensureAuth, MessageCtrl.getMessage );
api.put('/edit-message/:id', md_auth.ensureAuth, MessageCtrl.editMessage );
api.delete('/delete-message/:id', md_auth.ensureAuth, MessageCtrl.deleteMessage );


module.exports = api;