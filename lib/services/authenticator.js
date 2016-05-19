/**
 * Created by flori on 17.05.2016.
 */

'use strict';

// imports
var _ = require('lodash'),
    Q = require('q'),
    database = require('../database/Collection')
;

module.exports = function(){

    var user = database.getCollection('user');

    function authenticate(mat, ani){

        //var deferred = Q.defer();

        user.find({number : mat, pin : ani})
            .then(function(doc){

            })
            .catch(function(error){

            });





        //return deferred.promise;

    };


    return {
        authenticate : authenticate
    };

};
