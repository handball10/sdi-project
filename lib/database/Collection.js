/**
 * Created by flori on 03.05.2016.
 */

'use strict';

var Q = require('q'),
    _ = require('lodash'),
    nconf = require('nconf'),
    Datastore = require('nedb'),
    winston = require('winston');


var connection,
    collections = {};


function Collection(name){

    winston.log('info', 'creating collection '+name);

    var self = this;

    this.name = name;

    // build a new nedb collection
    this.collection = new Datastore({
        //filename: __dirname + '\\' + name,
        filename: __dirname + '/../../database/' + name,
        autoload: true
    });

    /**
     * @method insert
     * @param data
     * @returns {Promise.promise|*}
     */
    this.insert = function (data) {
        var deferred = Q.defer();


        self.collection.insert(data, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                if (_.isArray(doc)) {
                    doc = doc[0];
                }
                deferred.resolve(doc);
            }
        });


        return deferred.promise;
    };

    /**
     * @method find
     * @param query
     * @param sort
     * @returns {Promise.promise|*}
     */
    this.find = function (query, sort) {
        query = query || {};
        sort = sort || {};

        var deferred = Q.defer();


        self.collection.find(query)
            .sort(sort).exec(function (err, docs) {

            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(docs);
            }
        });

        return deferred.promise;
    };


    /**
     * @method findOne
     * @param query
     * @returns {*}
     */
    this.findOne = function (query) {
        var deferred = Q.defer();

        self.collection.findOne(query, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });


        return deferred.promise;
    };


    /**
     * @method update
     * @param query
     * @param data
     * @returns {Promise.promise|*}
     */
    this.update = function (query, data) {

        var deferred = Q.defer();

        this.collection.update(query, data, function (err, docs) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(docs);
            }
        });

        return deferred.promise;
    };


    /**
     * @method remove
     * @param query
     * @param options
     * @returns {Promise.promise|*}
     */
    this.remove = function (query, options) {

        var deferred = Q.defer();

        // Override default NeDB behaviour, and allow removal
        // of multiple documents
        options.multi = options.multi || true;

        this.collection.remove(query, options, function (err, numRemoved) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(numRemoved);
            }
        });

        return deferred.promise;
    };


    /**
     * @method clear
     * @returns {*}
     */
    this.clear = function () {
        return this.remove({}, {multi: true});
    }

};

module.exports.getCollection = function(name){
    winston.log('warn', 'request collection',name);
    if (collections.hasOwnProperty(name)) {
        winston.log('new Collection ', name);
        return collections[name];
    }
    else {
        winston.log('info','return collection', name);
        return collections[name] = new Collection(name);
    }
};

module.exports.connect = function(){
    return Q();
};
