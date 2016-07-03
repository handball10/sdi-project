/**
 * Created by flori on 03.07.2016.
 */

'use strict';

var express = require('express'),
    Q = require('q'),
    winston = require('winston'),
    db = require('../../database/Collection')

;

var router = express.Router(),
    course = db.getCollection('course')

;

router.post('/', function(req, res){

    console.log(req.body);

    console.log(req.body.KURS_NR || '');

    var courseNr = req.body.KURS_NR || '';

    course.find({number : courseNr})
        .then(function(result){

            console.log(result);

            if(result.length > 0){
                result = result[0];

                console.log(result.description);

                res.json({
                    course : result.description
                });
            } else {
                res.json({
                    course : ''
                });
            }
        })
        .catch(function(error){
            res.json({
                course : 'Es wurde kein Kurs gefunden, der zu Ihrer Eingabe passt!'
            });
        })
        .finally(function(){
            res.end();
        });

});

module.exports = router;