var express = require('express');
var RequestCtrl = require('../controllers/requestWeekUser');
var api = express.Router();
var md_Auth = require('../middlewares/authenticated');

api.post('/set-request-week', md_Auth.ensureAuth, RequestCtrl.controlRequest );
api.put('/update-request-week/:id', md_Auth.ensureAuth, RequestCtrl.updateControlRequest);
api.get('/get-request-week', md_Auth.ensureAuth, RequestCtrl.getControler );
api.post('/save-request-user/:id', md_Auth.ensureAuth, RequestCtrl.saveRequestWeek );
api.put('/update-request-user/:id', md_Auth.ensureAuth, RequestCtrl.updateRequestUser );
api.post('/get-request-user', md_Auth.ensureAuth, RequestCtrl.getRequestWeek );
api.post('/get-all-request', md_Auth.ensureAuth, RequestCtrl.getAllRequestWeek );
api.post('/save-management/:week/:year', md_Auth.ensureAuth, RequestCtrl.saveFinalManagement );
api.post('/get-management', md_Auth.ensureAuth, RequestCtrl.getFinalManagement );
api.put('/update-management/:id', md_Auth.ensureAuth, RequestCtrl.updateFinalManagement );

module.exports = api;