/**
 * Created by flori on 26.04.2016.
 */

'use strict';

// imports

var express = require('express'),
    Q = require('q'),
    winston = require('winston'),
    validator = require('validator'),
    shortId = require('shortid'),
    winston = require('winston'),
    uuid = require('node-uuid'),
    event = require('../../services/event')

    ;

var router = express.Router(),
    db = require('../../database/Collection')
    ;

var sessionModel = db.getCollection('session'),
    userModel = db.getCollection('user')
    ;

router.post('/', function (req, res) {

    console.log(req.body);

    if (!req.body.ANI || !validator.isNumeric(req.body.ANI)) {
        winston.log('info', 'bad request');
        return res.sendStatus(400).end();
    }

    // session information
    var data = {};
    data.creationDate = Date.now();
    data.uuid = uuid.v4();
    data.publicUuid = shortId.generate();
    data.ani = parseInt(req.body.ANI, 10);

    console.log(data);

    var sessionID;

    sessionModel.insert(data)
        .then(function (session) {

            event.log(event.EVENTS.CALL.INCOMING, {
                id: session.uuid,
                creationDate: session.creationDate,
                ani: session.ani
            });

            sessionID = session.uuid;

            return userModel.find({ani: session.ani});

        }).then(function (user) {

            console.log(user);

            if (user.length === 0) {
                console.log("no User");
                res.json({
                    id: sessionID,
                    number: 0
                });
            } else {
                res.json({
                    id: sessionID,
                    number: user[0].number
                });
            }
        })
        .catch(function (err) {
            winston.error(err);
        })
        .finally(function () {
            res.end();
        });


});

module.exports = router;