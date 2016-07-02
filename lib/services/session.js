/**
 * Created by flori on 10.05.2016.
 */

'use strict';

// imports
var database = require('../database/Collection'),
    Q = require('q'),
    validator = require('validator')

;

// module variables


module.exports = function(){

    var sessions = database.getCollection('session');

    /**
     * Performs a validation of he given sessionID. Checks if the sessionID is in the correct format and available in the database.
     * @param sessionID uuid formatted sessionID
     * @returns {d.promise|*|promise}
     */
    var validateSessionID = function(sessionID) {

        var deferred = Q.defer();

        // check for valid uuid v4
        if(!sessionID || !validator.isUUID(sessionID, 4)){
            deferred.reject(400);

            return deferred.promise;
        }

        // find session in database
        sessions.find({uuid : sessionID})
            .then(function(session, error){

                if(session.length !== 1 || error){

                    console.log(error);
                    deferred.reject({message: 'Invalid session id!'});
                } else {
                    deferred.resolve(session);
                }
            });

        return deferred.promise;
    };

    return {
        validateSessionID : validateSessionID
    };
}();
