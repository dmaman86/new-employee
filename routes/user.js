'use strict'

var express = require('express');
var UserCtrl = require('../controllers/user');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' });


api.get('/home', UserCtrl.home );
api.post('/register', UserCtrl.saveUser );
api.post('/login', UserCtrl.loginUser );
api.get('/users/:page?', md_auth.ensureAuth, UserCtrl.getAllUsers );
api.get('/user/:id', md_auth.ensureAuth, UserCtrl.getUser );
api.put('/update-user/:id', md_auth.ensureAuth, UserCtrl.updateUser );
api.put('/admin-update-user/:id', md_auth.ensureAuth, UserCtrl.adminUpdateUser );
api.delete('/delete-user/:id', md_auth.ensureAuth, UserCtrl.deleteUser );
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload],UserCtrl.uploadImagen);
api.get('/get-image-user/:imageFile', UserCtrl.getImageFile);
api.post('/update-admin', UserCtrl.updateAdmin );


module.exports = api;