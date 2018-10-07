'use strict'

var express = require('express');
var UserCtrl = require('../controllers/user');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.get('/home', UserCtrl.home );
api.post('/register', UserCtrl.saveUser );
api.post('/login', UserCtrl.loginUser );
api.get('/users/:page?', md_auth.ensureAuth, UserCtrl.getAllUsers );
api.get('/user/:id', md_auth.ensureAuth, UserCtrl.getUser );
api.put('/update-user/:id', md_auth.ensureAuth, UserCtrl.updateUser );
api.put('/admin-update-user/:id', md_auth.ensureAuth, UserCtrl.adminUpdateUser );
api.delete('/delete-user/:id', md_auth.ensureAuth, UserCtrl.deleteUser );


module.exports = api;