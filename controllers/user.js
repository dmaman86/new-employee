'use strict'

var moment = require('moment');
var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var _ = require('underscore');


function home(req, res){
    res.status(200).send({
        message: 'Wellcome Home'
    });
}

function saveUser(req, res) {
    let params = req.body;
    let user = new User();

    if ( params.name && params.last_name && params.email && params.password ) {

        user.name = params.name;
        user.last_name = params.last_name;
        user.email = params.email;
        user.password = bcrypt.hashSync( params.password, 10 );
        user.createdAt = moment().unix();
        user.img = 'user.png';


        user.save( (err, userStored ) => {
            if(err){
                return res.status(500).send({
                    message: `Error when saving user ${ err }`
                });
            }
            if( !userStored ) {
                return res.status(404).send({
                    ok: false,
                    message: 'Sorry but we cant save user in DB'
                });
            }

            res.status(200).send({
                ok: true,
                user: userStored
            });
        });



    } else {
        res.status(200).send({
            message: 'Send all the necessary fields'
        });
    }
}

function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({ email: email }, (err, user) => {

        if(err) return res.status(500).send({ message: `Error en request login: ${ err }` });

        if(!user) return res.status(404).send({ message: 'User not exist' });

        if ( !bcrypt.compareSync( password, user.password ) ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or (Password) wrong'
                }
            });
        }

        if( params.gettoken ) {
            return res.status(200).send({
                token: jwt.createToken(user)
            });
        }

        return res.status(200).send({ user });
    });
}

function getAllUsers( req, res ) {

    var identity_user_id = req.user.sub;

    var page = 1;
    if( req.params.page ) {
        page = req.params.page;
    }

    var itemsPerPage = 5;

    User.findById( identity_user_id ).exec( (err, user) => {
        if(err){
            return res.status(500).send({
                message: `Please try again later: ${ err }`
            });
        }

        if( !user ) {
            return res.status(404).send({
                message: `You haven't authorization`
            });
        }

        User.find({ status: true }).sort('_id').paginate( page, itemsPerPage, (err, users, total) => {
            if(err) return res.status(500).send({message: `Error in request: ${ err }`});

            if(!users) return res.status(404).send({ message: 'list users is empty' });

            return res.status(200).send({
                users,
                total,
                pages: Math.ceil( total/itemsPerPage )
            });


        });
    });
}

function getUser(req, res) {
    var userId = req.params.id;

    if( !req.user.sub ) {
        return res.status(500).send({
            message: `you haven't authorization`
        });
    }

    User.findById( userId, (err, user) => {
        if(err) return res.status(500).send({message: `Error in request: ${ err }`});

        if(!user) return res.status(404).send({message: 'user not exist'});

        return res.status(200).send({
            user
        });

    });
}

function updateUser(req, res) {
    let id = req.params.id;
    let body = _.pick( req.body, ['name', 'last_name','email', 'password','img', 'role', 'status'] );

    User.findByIdAndUpdate( id, body, { new: true }, (err, userDB) => {

        if(err){
            return res.status(400).send({
                ok: false,
                err
            });
        }
        res.send({
            ok: true,
            user: userDB
        });
    });
}

function adminUpdateUser(req, res) {
    var userId = req.params.id;
    var body = _.pick( req.body, ['name', 'last_name', 'email', 'img', 'role', 'status']);

    if ( req.user.role === 'ADMIN_ROLE' ) {
        User.findByIdAndUpdate( userId, body, { new: true }, (err, userDB) => {
            if(err){
                return res.status(500).send({
                    ok: false,
                    err
                });
            }
            res.status(200).send({
                ok: true,
                user: userDB
            });
        });
    } else {
        res.status(500).send({
            ok: false,
            message: `You can't update this user`
        });
    }
}

// we don't delete any user, we change status to false
function deleteUser(req, res) {
    var userId = req.params.id;

    let changeStatus = {
        status: false
    };

    User.findByIdAndUpdate( userId, changeStatus, { new: true }, (err, userDelete) => {
        if(err){
            return res.status(500).send({
                ok: false,
                err
            });
        }

        if(!userDelete){
            return res.status(404).send({
                ok: false,
                err:{
                    message: 'user not exist'
                }
            });
        }

        res.status(200).send({
            ok: true,
            user: userDelete
        });
    });
}


module.exports = {
    home,
    saveUser,
    loginUser,
    getAllUsers,
    getUser,
    updateUser,
    adminUpdateUser,
    deleteUser
}