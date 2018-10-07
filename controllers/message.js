'use strict'

var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');
var Message = require('../models/message');

function saveMessage(req, res){

    var params = req.body;

    if ( req.user.role !== 'ADMIN_ROLE' ) {
        return res.status(500).send({
            message: `You haven't authorization to save message`
        });
    }

    if( params.text ) {
        var message = new Message();
        message.text = params.text;
        message.created_at = moment().unix();
        message.status = true;

        message.save( (err, messageStored) => {
            if(err){
                return res.status(500).send({
                    ok: false,
                    message: `Error in request: ${ err }`
                });
            }

            if( !messageStored ) {
                return res.status(404).send({
                    ok: false,
                    message: 'Please try again later or connect to admin'
                });
            }

            res.status(200).send({
                ok: true,
                message: messageStored
            });
        });
    }

}

function getMessage(req, res) {
    Message.find({ status: true }).exec( (err, message) => {

        if ( err ) {
            return res.status(500).send({
                ok: false,
                message: `Error in request: ${ err }`
            });
        }
        if( !message ) {
            return res.status(404).send({
                ok: false,
                message: 'List message is empty'
            });
        }

        res.status(200).send({
            ok: true,
            message: message[message.length - 1]
        });
    });
}

function editMessage(req, res) {

    var messageId = req.params.id;
    var update = req.body;

    if ( req.user.role !== 'ADMIN_ROLE' ) {
        return res.status(500).send({
            message: `You haven't authorization to edit this message`
        });
    }

    Message.findByIdAndUpdate( messageId, update, { new: true }, (err, messageUpdate) => {
        if( err ) {
            return res.status(500).send({
                ok: false,
                message: `Error in request: ${ err }`
            });
        }

        if( !messageUpdate ) {
            return res.status(404).send({
                ok: false,
                message: 'Something wrong, try again later or connect to admin'
            });
        }

        res.status(200).send({
            ok: true,
            message: messageUpdate
        });
    });
}

function deleteMessage(req, res){

    var messageId = req.params.id;

    let changeStatus = {
        status: false
    };

    if ( req.user.role !== 'ADMIN_ROLE' ) {
        return res.status(500).send({
            message: `You haven't authorization to delete this message`
        });
    }

    Message.findByIdAndUpdate( messageId, changeStatus, { new: true }, (err, messageDelete) => {
        if(err){
            return res.status(500).send({
                ok: false,
                err
            });
        }

        if( !messageDelete ){
            return res.status(404).send({
                ok: false,
                message: 'message not exist'
            });
        }

        res.status(200).send({
            ok: true,
            message: messageDelete
        });
    });
}

module.exports = {
    saveMessage,
    getMessage,
    editMessage,
    deleteMessage
}