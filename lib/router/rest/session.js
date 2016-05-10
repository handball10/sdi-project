/**
 * Created by flori on 26.04.2016.
 */

'use strict';

// imports

var express = require('express'),
    Q = require('q'),
    winston = require('winston')
;

module.exports = function SessionRouter(collection){

    var router = express.Router()

    ;

    router.get('/:uuid', function(req, res){

        collection.getById(req.params.uuid || req.params.id)
            .then(function(session){
                res.json({
                    id : session.uuid,
                    creationDate : session.creationDate
                });
            })
            .catch(function(status){
                res.sendStatus(status);
            })
            .finally(function(){
                res.end();
            })
    });

    router.get('/', function(req, res){

        collection.add()
            .then(function(session){
                res.json({
                    id : session.uuid,
                    creationDate : session.creationDate
                });
            })
            .catch(function (err) {
                winston.error(collection.type, ' not created', err);
            })
            .finally(function () {
                res.end();
            });


    });

    return router;

};

