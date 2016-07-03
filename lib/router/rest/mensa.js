/**
 * Created by flori on 03.07.2016.
 */

'use strict';

var express = require('express'),
    Q = require('q'),
    winston = require('winston'),
    db = require('../../database/Collection'),
    moment = require('moment')

;

var router = express.Router(),
    mensa = db.getCollection('mensa')

;

router.post('/', function(req, res){

    console.log(req.body.MENSA_DATE);



    return res.json({

        result : 'Das wird lecker'
    }).end();

});

module.exports = router;