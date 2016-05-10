/**
 * Created by flori on 26.04.2016.
 */

'use strict';

// imports

var express = require('express'),
    Q = require('q'),
    winston = require('winston')
;

var router = express.Router()

;

router.get('/:xml', function(req, res){
    res.status(200).json({
        success : true,
        content : req.params.xml
    }).end();
});


module.exports = router;