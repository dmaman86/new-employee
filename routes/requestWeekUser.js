var express = require('express');
var BakashotCtrl = require('../controllers/requestWeekUser');
var api = express.Router();
var md_Auth = require('../middlewares/authenticated');

api.post('/save-request-user/:id', md_Auth.ensureAuth, BakashotCtrl.saveRequestWeek );



module.exports = api;