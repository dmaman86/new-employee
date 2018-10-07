'use strict'

require('../config');
const jwt = require('jwt-simple');
const moment = require('moment');

exports.createToken = function( user ){
    var payload = {
        sub: user._id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };

    return jwt.encode( payload, process.env.SEED );
}