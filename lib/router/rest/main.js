/**
 * Created by flori on 26.04.2016.
 */

'use strict';


var express = require('express'),
    winston = require('winston')
;


var router = express.Router();

module.exports = function Router(){

    this.validator = function(req, res, next){
        next();
    };

    this.xml = require('./xml.js');

    this.authenticate = require('./authenticate.js');

    return this;
};
