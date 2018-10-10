'use strict'

var moment = require('moment');
var RequestWeekUser = require('../models/requestWeekUser');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');
var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
var shifts = ['morning', 'afternoon', 'night'];

function saveRequestWeek(req, res) {
    var userId = req.params.id;
    var params = req.body;

    var requestUser = new RequestWeekUser();

    if ( userId !== req.user.sub ) {
        return res.status(500).send({
            ok: false,
            message: `Sorry, but you don't have authorization`
        });
    } else {
        requestUser.emitter = req.user.sub;
        requestUser.numberWeek = params.numberWeek;

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
}

function getRequestWeek(req, res) {

}

function getAllRequestWeek(req, res) {

}


module.exports = {
    saveRequestWeek,
    getRequestWeek,
    getAllRequestWeek
}