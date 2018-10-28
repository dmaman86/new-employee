'use strict'

var mongoose = require('mongoose');
var uniqueValidated = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

let rolesValid = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} role not valid'
};

let levelValid = {
    values: ['TEAM_LEADER', 'EMPLOYEE'],
    message: '{VALUE} level not valid'
};

var UserSchema = Schema({
    name: {
        type: String,
        required:[true, 'Name is required']
    },
    last_name:{
        type: String,
        required:[true, 'Last Name is required']
    },
    email:{
        type: String,
        unique: true,
        required:[true, 'Email is required']
    },
    nick_name:{
        type: String
    },
    password:{
        type: String,
        /*required: true*/
    },
    img:{
        type: String,
        required: false
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: rolesValid
    },
    level:{
        type: String,
        default: 'EMPLOYEE',
        enum: levelValid
    },
    status:{
        type: Boolean,
        default: true
    },
    createdAt:{
        type: String
    }
});

/*UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    delete userObject.password;

    return userObject;
}*/

UserSchema.plugin( uniqueValidated, { message: '{PATH} must be unique' } );

module.exports = mongoose.model( 'User', UserSchema );
