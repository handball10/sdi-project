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

    this.test = require('./test.js');

    return this;
};
