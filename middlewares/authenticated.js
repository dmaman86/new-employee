'use strict';

require('../config');

var jwt = require('jwt-simple');
var moment = require('moment');

exports.ensureAuth = function(req, res, next){

    if(!req.headers.authorization){
        return res.status(403).send({
            message: 'Request no authenticated'
        });
    }
    // clean token
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try{
        var payload = jwt.decode( token, process.env.SEED );

        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                message: 'Expired Token'
            });
        }
    }catch(ex){
        return res.status(404).send({
            message: 'Token no valid'
        });
    }
    req.user = payload;

    next();
}