/**
 * Created by flori on 28.04.2016.
 */

'use strict';

// imports

var express = require('express'),
    Q = require('q'),
    paramValidator = require('../paramValidator.js')

;

var router = express.Router()

;

// define param rules
router.param('matrikel', paramValidator.validators.tenDigit);
//router.param('ani', validator.number10digit);
router.param('ani', paramValidator.validators.tenDigit);


router.get('/:matrikel/:ani', function(req, res){
//router.get('/:matrikel(^[0-9]{1,10}$)/:ani(^[0-9]{1,10}$)', function(req, res){

    var matrikelNumber = req.params.matrikel || 0,
        aniNumber      = req.params.ani || 0
    ;





    res.status(200).json({
        a : matrikelNumber,
        b : aniNumber
    }).end();




});

module.exports = router;