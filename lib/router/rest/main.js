/**
 * Created by flori on 26.04.2016.
 */

'use strict';


var express = require('express'),
    winston = require('winston'),
    validator =require('validator'),
    nconf = require('nconf'),
    SessionRouter = require('./session')
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

    this.session = new SessionRouter(model.Session);

    this.xml = require('./xml.js');

    this.authenticate = require('./authenticate.js');

    this.test = function(req, res){

        var t1 = req.body.testVar || 0,
            t2 = req.body.testVar2 || 0

        ;

        return res.status(200).json({
            test : t1,
            test2 : t2
        }).end();


    };

    return this;
};
