/**
 * Created by flori on 28.04.2016.
 */

'use strict';

// imports

var express = require('express'),
    winston = require('winston')

    ;

var router = express.Router();


router.post('/test', function(req, res){

    var t1 = req.body.testVar || 0,
        t2 = req.body.testVar2 || 0

    ;

    winston.log('info', t1, t2);

    //winston.log('info', req.body.test);

    return res.status(200).json({
        test : t1,
        test2 : t2
    }).end();


});

module.exports = router;