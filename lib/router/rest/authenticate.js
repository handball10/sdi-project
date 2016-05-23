/**
 * Created by flori on 28.04.2016.
 */

'use strict';

// imports

var express = require('express'),
    Q = require('q'),
    paramValidator = require('../paramValidator.js'),
    authenticator = require('../../services/authenticator.js')

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



    if(matrikelNumber === 0 || aniNumber === 0){
        return res.sendStatus(403).end();
    }

    authenticator.authenticate(matrikelNumber, aniNumber)
        .then(function(authObject){

            res
                .status(200)
                .json({
                    status : 200,
                    hash : authObject.hash
                });

        })
        .catch(function(error){
            res
                .statusCode(error.status || 400)
                .json({
                    status : error.status || 400,
                    message : error.message || ''
                });
        })
        .finally(function(){
            res.end();
        });




    //
    //res.status(200).json({
    //    a : matrikelNumber,
    //    b : aniNumber
    //}).end();




});

module.exports = router;