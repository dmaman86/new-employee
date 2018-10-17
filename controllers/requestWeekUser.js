'use strict'

var moment = require('moment');
var RequestWeekUser = require('../models/requestWeekUser');
var RequestWeek = require('../models/requestWeek');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');
var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
var shifts = ['morning', 'afternoon', 'night'];

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
    requestUser.created_at = moment().unix();

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

function getRequestWeek(req, res) {
    // we recept id user and number week
    var params = req.body;

    var userId = params._id;
    var numberWeek = params.numberWeek;

    if ( userId !== req.user.sub ) {
        return res.status(500).send({
            ok: false,
            message: `Sorry, but you don't have authorization`
        });
    }

    RequestWeekUser.find({ emitter: userId, numberWeek: numberWeek }, (err, requestUser) => {
        if ( err ) {
            return res.status(500).send({
                ok: false,
                message: err
            });
        }

        if ( !requestUser ) {
            return res.status(404).send({
                ok: false,
                message: 'Not found request by this user in this week'
            });
        }

        // console.log( 'line 86 ' + requestUser );
        var list = [];
        requestUser.forEach( element => {
            // console.log( element + '\n' );
            list.push( element );
        });
        // console.log( list );
        if ( list.length > 1 ) {
            removeLastRequest( requestUser ).then( (value) => {
                // console.log( 'line 96 ' , value );
                return res.status(200).send({
                    ok: true,
                    request: value
                })
            })
        } else {
            if ( requestUser.length > 0 ) {
                // console.log( 'line 104' , requestUser[0] );
                return res.status(200).send({
                    ok: true,
                    request: requestUser[0]
                })
            }
            if ( requestUser.length == 0 ) {
                return res.status(200).send({
                    ok: false,
                    message: 'No request user for this week'
                })
            }
            // console.log( 'line 110' , requestUser );
            res.status(200).send({
                ok: true,
                request: requestUser
            });
        }
    });

}

async function removeLastRequest ( request ) {
    var temp = request[0];
    var requestId = temp._id;
    var reque = await RequestWeekUser.findByIdAndRemove( requestId, (err, del) => {
        if ( err ) return hangleError( err );
        return del;
    });
    var tmp = request[1];
    return tmp;
}


function getAllRequestWeek(req, res) {

}


module.exports = {
    controlRequest,
    updateControlRequest,
    getControler,
    saveRequestWeek,
    getRequestWeek,
    getAllRequestWeek
}