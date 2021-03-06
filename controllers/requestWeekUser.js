'use strict'

var moment = require('moment');
var RequestWeekUser = require('../models/requestWeekUser');
var RequestWeek = require('../models/requestWeek');
var FinalManagement = require('../models/finalManagement');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');
var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
var shifts = ['morning', 'afternoon', 'night'];

/* Functions to set how much shift need a user to send */

function controlRequest(req, res) {
    var params = req.body;

    if ( req.user.role !== 'ADMIN_ROLE' ) {
        return res.status(500).send({
            ok: false,
            message: `you do not have authorization for this method`
        });
    }
    
    var reqWeek = new RequestWeek();
    reqWeek.method = params.method;
    reqWeek.last_day = params.last_day;
    reqWeek.morning = params.morning;
    reqWeek.afternoon = params.afternoon;
    reqWeek.night = params.night;
    reqWeek.weekend = params.weekend;

    reqWeek.save( (err, reqWeekStored) => {
        if(err){
            return res.status(500).send({
                ok: false,
                message: `Error in request ${ err }`
            });
        }
        if(!reqWeekStored){
            return res.status(404).send({
                ok: false,
                message: 'Something wrong, please try again later or connect to admin'
            });
        }

        res.status(200).send({
            ok: true,
            week: reqWeekStored
        });
    });

}

function updateControlRequest(req, res) {
    var params = req.body;
    var requestId = req.params.id;

    if ( req.user.role !== 'ADMIN_ROLE' ) {
        return res.status(500).send({
            ok: false,
            message: `you do not have authorization for this method`
        });
    }

    RequestWeek.findByIdAndUpdate( requestId, params, { new: true }, (err, weekDB) => {
        if(err){
            return res.status(400).send({
                ok: false,
                message: `Error in request: ${ err }`
            });
        }
        res.status(200).send({
            ok: true,
            week: weekDB
        });
    });
}

function getControler(req, res) {
    RequestWeek.find({}).exec( (err, week) => {
        if ( err ) {
            return res.status(500).send({
                ok: false,
                message: `Error to find values request ${ err }`
            });
        }

        if ( !week ) {
            return res.status(404).send({
                ok: false,
                message: 'Not found week values'
            });
        }
        return res.status(200).send({
            ok: true,
            values: week[0]
        });
    });
}

/* Functions for user */

function saveRequestWeek(req, res) {
    var userId = req.params.id;
    var params = req.body;

    var requestUser = new RequestWeekUser();

    if ( userId !== req.user.sub ) {
        return res.status(500).send({
            ok: false,
            message: `Sorry, but you don't have authorization`
        });
    }
    requestUser.emitter = req.user.sub;
    requestUser.numberWeek = params.numberWeek;
    requestUser.year = params.year;
    requestUser.created_at = moment().unix();
    requestUser.message = params.message;

    for ( let i = 0; i < days.length; i++ ) {
        var d = days[i];
        for ( let j = 0; j < shifts.length ; j++ ) {
            var s = shifts[j];
            requestUser[d][s] = params[d][s];
        }
    }

    requestUser.save( (err, requestUserStored) => {
        if(err){
            return res.status(500).send({
                ok: false,
                message: `Error in request save request ${ err }`
            });
        }
        if(!requestUserStored){
            return res.status(404).send({
                ok: false,
                message: 'Something wrong, please try again later or connect to admin'
            });
        }

        res.status(200).send({
            ok: true,
            requestUser: requestUserStored
        });
    });
    
}

function updateRequestUser(req, res){
    var requestUser = req.params.id;
    var update = req.body;

    update.created_at = moment().unix();

    if ( update.emitter !== req.user.sub ) {
        return res.status(500).send({
            ok: false,
            message: `You can't update this request`
        });
    }

    RequestWeekUser.findByIdAndUpdate( requestUser, update, { new: true}, (err, newRequestUser) => {
        if  (err ) {
            return res.status(500).send({
                ok: false,
                message: `Error in request update ${ err }`
            });
        }

        if ( !newRequestUser ) {
            return res.status(404).send({
                ok: false,
                message: 'Sorry but not find this request for this week'
            })
        }

        return res.status(200).send({
            ok: true,
            request: newRequestUser
        });
    });
}

function getRequestWeek(req, res) {
    var params = req.body;
    
    var userId = params.emitter;
    var numberWeek = params.numberWeek;
    var year = params.year;

    // console.log( userId, numberWeek );

    if ( userId !== req.user.sub ) {
        return res.status(500).send({
            ok: false,
            message: `Sorry, but you don't have authorization`
        });
    }

    RequestWeekUser.find( { emitter: userId, numberWeek: numberWeek, year: year }, ( err, userRequest ) => {
        if ( err ) {
            return res.status(500).send({
                ok: false,
                message: err
            });
        }

        if ( !userRequest ) {
            return res.status(404).send({
                ok: false,
                message: 'Not found request by this user in this week'
            });
        }

        return res.status(200).send({
            ok: true,
            request: userRequest[0]
        });
    });
}

function getAllRequestWeek(req, res) {

    var params = req.body;

    var week = params.week;
    var year = params.year;

    if ( req.user.role !== 'ADMIN_ROLE' ) {
        return res.status(500).send({
            ok: false,
            message: 'You do not have authorization to this'
        });
    }

    RequestWeekUser.find({ numberWeek: week, year: year }, (err, requests) => {
        if ( err ) {
            return res.status(500).send({
                ok: false,
                message: `Error to find ${ err }`
            });
        }
        if ( !requests ) {
            return res.status(404).send({
                ok: false,
                message: 'No found request for this week'
            });
        }

        return res.status(200).send({
            ok: true,
            resp: requests
        });
    });
}

function saveFinalManagement(req, res) {
    var week = req.params.week;
    var year = req.params.year;
    var body = req.body;

    if ( req.user.role !== 'ADMIN_ROLE' ) {
        return res.status(500).send({
            ok: false,
            message: `you do not have authorization for this method`
        });
    }

    var finalManagement = new FinalManagement();
    finalManagement.numberWeek = week;
    finalManagement.year = year;

    for( let i = 0; i < days.length; i++ ) {
        var day = days[i];
        for( let j = 0; j < shifts.length; j++ ) {
            var shift = shifts[j];
            var temp = body[day][shift];
            for ( let u = 0; u < temp.length; u++ ) {
                finalManagement[day][shift][u] = temp[u];
            }
        }
    }

    // console.log( 'line 291' , finalManagement );

    finalManagement.save( (err, managementStored) => {
        if(err){
            return res.status(500).send({
                message: `Error when saving management ${ err }`
            });
        }
        if( !managementStored ) {
            return res.status(404).send({
                ok: false,
                message: 'Sorry but we cant save management in DB'
            });
        }
        
        res.status(200).send({
            ok: true,
            management: managementStored
        });
    });
}

function updateFinalManagement(req, res) {
    var params = req.body;
    var requestId = req.params.id;

    if ( req.user.role !== 'ADMIN_ROLE' ) {
        return res.status(500).send({
            ok: false,
            message: `you do not have authorization for this method`
        });
    }

    FinalManagement.findByIdAndUpdate( requestId, params, { new: true }, (err, updateFinalManagement) => {
        if(err){
            return res.status(400).send({
                ok: false,
                message: `Error in request: ${ err }`
            });
        }
        res.status(200).send({
            ok: true,
            management: updateFinalManagement
        });
    });
}

function getFinalManagement(req, res) {
    var params = req.body;

    var week = params.week;
    var year = params.year;

    FinalManagement.findOne({ numberWeek: week, year: year }, (err, requests) => {
        if(err){
            return res.status(500).send({
                ok:false,
                message: `Error when get management ${ err }`
            });
        }
        if( !requests ) {
            return res.status(404).send({
                ok: false,
                message: 'Sorry but we cant get management from DB'
            });
        }
        
        res.status(200).send({
            ok: true,
            management: requests
        });
    });
}


module.exports = {
    controlRequest,
    updateControlRequest,
    getControler,
    saveRequestWeek,
    updateRequestUser,
    getRequestWeek,
    getAllRequestWeek,
    saveFinalManagement,
    updateFinalManagement,
    getFinalManagement
}