/**
 * Created by flori on 26.04.2016.
 */

'use strict';


var express = require('express'),
    winston = require('winston'),
    validator =require('validator'),
    nconf = require('nconf'),
    //SessionRouter = require('./session'),
    session = require('../../services/session')
;


var router = express.Router();

module.exports = function Router(model){

    /**
     * tests if a request contains api key
     * @param req
     * @param res
     * @param next
     */
    this.validator = function(req, res, next){
        validator.isUUID(req.params.api, 4) &&
        req.params.api === nconf.get("security:apiKey")
            ? next()
            : res.sendStatus(403).end();
    };

    //console.log(model);

    this.validateSessionID = function(req, res, next){
        //var ip = req.headers['x-forwarded-for'] ||
        //    req.connection.remoteAddress ||
        //    req.socket.remoteAddress ||
        //    req.connection.socket.remoteAddress;

        session.validateSessionID(req.body.SESSION_ID)
            .then(function(){
                console.log('correct session');
                next();
            })
            .catch(function(error){
                res.sendStatus(403).end();
            });
    };

    this.session = require('./sessionNew');
    //this.session = new SessionRouter(model.Session);

    this.xml = require('./xml.js');

    this.authenticate = require('./authenticate.js');

    this.test = require('./test.js');

    this.user = require('./user');

    this.course = require('./course');

    this.mensa = require('./mensa');

    return this;
};
