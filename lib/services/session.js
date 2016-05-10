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
var sessions = database.getCollection('session');

module.exports = (function(){

    /**
     * Performs a validation of he given sessionID. Checks if the sessionID is in the correct format and available in the database.
     * @param sessionID uuid formatted sessionID
     * @returns {d.promise|*|promise}
     */
    this.validateSessionID = function(sessionID) {

        var deferred = Q.defer();

        // check for valid uuid v4
        if(!sessionID || !validator.isUUID(sessionID, 4)){
            deferred.reject(400);

            return deferred.promise;
        }

        // find session in database
        sessions.findOne({uuid : sessionID})
            .then(function(session, error){
                if(!session || error){
                    deferred.reject(error);
                } else {
                    deferred.resolve(session);
                }
            });

        return deferred.promise;
    };

    return this;
})();
