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

    mensa.find({date:req.body.MENSA_DATE})
        .then(function(plan){
            if(plan.length > 0){
                plan = plan[0];

                console.log(plan.plan);

                res.json({
                    date : (moment(req.body.MENSA_DATE+(moment().year()), 'DD.MM.YYYY')).format('D. MMMM'),
                    plan : plan.plan
                });
            } else {
                res.json({
                    date : (moment(req.body.MENSA_DATE+(moment().year()), 'DD.MM.YYYY')).format('D. MMMM'),
                    plan : ''
                })
            }
        })
        .catch(function(error){
            res.json({
                plan : 'Es wurde kein Eintrag in der Mensa-datenbank gefunden!'
            });
        })
        .finally(function(){
            res.end();
        });


});

module.exports = router;