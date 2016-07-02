/**
 * Created by flori on 17.05.2016.
 */

'use strict';

// imports
var _ = require('lodash'),
    Q = require('q'),
    database = require('../database/Collection'),
    logging = require('./logging')

;

var user = database.getCollection('user')

;

module.exports = (function(){

    //var user = database.getCollection('user');


    function authenticate(mat, ani){

        var deferred = Q.defer();

        user.find({number : mat, pin : ani})
            .then(function(user){
                if(user.length > 0){
                    deferred.resolve({
                        hash : '11--22--33--44--55'
                    });
                } else {
                    deferred.reject({
                        status : 'wrong credentials'
                    });
                }

            })
            .catch(function(error){
                deferred.reject({
                    status : 'wrong credentials'
                });
            });





        return deferred.promise;

    };


    return {
        authenticate : authenticate
    };

})();
