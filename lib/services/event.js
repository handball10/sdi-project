/**
 * Created by flori on 02.07.2016.
 */

'use strict';

// imports
var winston = require('winston'),
    db = require('../database/Collection'),
    _ = require('lodash'),
    shortId = require('shortid')
;

// private stuff
var logTable = db.getCollection('log');


module.exports = (function(){

    var EVENTS = {
        CALL : {
            INCOMING : {
                name : 'EVENT::CALL::INCOMING'
            }
        }
    };

    var log = function(type, data){

        var eventData = _.extend(type, {
            id : shortId.generate(),
            date : Date.now()
        });

        eventData.data = data;

        logTable.insert(eventData);

    };

    return {
        log : log,
        EVENTS : EVENTS
    }

})();
