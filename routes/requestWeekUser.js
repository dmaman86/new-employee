var express = require('express');
var RequestCtrl = require('../controllers/requestWeekUser');
var api = express.Router();
var md_Auth = require('../middlewares/authenticated');

api.post('/save-request-user/:id', md_Auth.ensureAuth, RequestCtrl.saveRequestWeek );
api.post('/get-request-user', md_Auth.ensureAuth, RequestCtrl.getRequestWeek );



module.exports = api;