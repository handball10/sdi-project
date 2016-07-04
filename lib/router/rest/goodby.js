/**
 * Created by flori on 03.07.2016.
 */

'use strict';

var express = require('express'),
    Q = require('q'),
    winston = require('winston'),
    db = require('../../database/Collection'),
    event = require('../../services/event')
    ;

var router = express.Router(),
    session = db.getCollection('mensa')

    ;

router.post('/', function(req, res){

    var sessionID = rey.body.SESSION_ID;

    session.remove({uuid : sessionID})
        .then(function(numberOfRemovedItems){

            event.log(event.EVENTS.CALL.FINISH, {
                id : sessionID,
                time : new Date().now()
            });

            res.json({
                goodby : true
            })



        })
        .catch(function(err){
            res.json({
                goodby : false,
                error : err.message
            });
        })
        .finally(function(){
            res.end();
        });



});

module.exports = router;