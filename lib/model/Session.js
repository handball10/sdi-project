/**
 * Created by flori on 09.05.2016.
 */

'use strict';

var Q = require('q'),
    validator = require('validator'),
    shortId = require('shortid'),
    winston = require('winston'),
    uuid = require('node-uuid')

;

module.exports = function(collection){

    function Session(collection){

        /**
         * @property type
         * @type {string}
         */
        this.type = 'Session';

        /**
         * @method getById
         * @param uuid
         * @returns {Promise.promise|*}
         */
        this.getById = function (uuid) {

            if (!validator.isUUID(uuid, 4)) {
                // Not a vlid uuid
                return Q.reject(406); //Not Acceptable
            }

            return collection.findOne({uuid: uuid})
                .then(function (result) {

                    if (!result) {
                        //Session not found
                        return Q.reject(404); // Not Found
                    }
                    else {
                        return result;
                    }

                });
        };


        /**
         * @method find
         * @param options
         * @returns {Promise.promise|*}
         */
        this.find = function (options) {
            return collection.find(options);
        };


        /**
         * @method add
         * @param data
         * @returns {Promise.promise|*}
         */
        this.add = function (data) {
            data = data || {};
            data.creationDate = Date.now();
            data.uuid = uuid.v4();
            data.publicUuid = shortId.generate();

            return collection.insert(data);
        };


        /**
         *
         * @method update
         * @param data
         * @returns {Promise.promise|*}
         */
        this.update = function (data) {
            var deferred = Q.defer();


            if (!data.uuid) {
                deferred.reject('Missing uuid');
            }

            // do not allow an update if the session is locked
            this.getById(data.uuid)
                .then(function (session) {

                    if (!session) {
                        deferred.reject('Session not found');
                    }

                    if (session.isLocked) {
                        deferred.reject('Session is locked');
                    }

                    // update timestamp
                    data.lastAccessDate = Date.now();

                    return collection.update({uuid: data.uuid}, data);

                }).then(function (result) {
                deferred.resolve(result);
            });


            return deferred.promise;
        };


        /**
         * @method remove
         * @param data
         * @returns {*}
         */
        this.remove = function (data) {
            return collection.remove({uuid: data.uuid});
        };

    }

    return new Session(collection);



};
