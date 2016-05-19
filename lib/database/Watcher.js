/**
 * Created by flori on 12.05.2016.
 */

'use strict';

// imports

var models = require('../model/index'),
    _ = require('lodash'),
    winston = require('winston'),
    cron = require('cron')

;

module.exports = function(model, conditions, interval, watcher, callback){

    if(!model || !(typeof model === 'object' && model.type)){
        throw new Error('Cannot assign db watcher to non model object!');
    }

    if(!conditions || !Object.keys(conditions).length){
        throw new Error('No filter conditions given!');
    }

    if(typeof interval !== "string"){
        throw new Error('The interval is not a String!')
    }

    callback = typeof callback === 'function' ? callback : function(){};

    var watcher;

    switch(watcher){
        case 'remove' : watcher = new RemoveWatcher(model, conditions, interval, callback); break;
        default : throw new Error('Watcher: The watcher \''+watcher+'\' is not available!');
    }


    return watcher;


    /**
     * Remove watcher to remove db entries by condition in a specific interval.
     * @param model The model that should be watched
     * @param conditions Object with removing conditions
     * @param interval Cron job like string with time interval
     * @constructor
     */
    function RemoveWatcher(model, conditions, interval, callback){

        this.model = model;

        this.condition = conditions;

        this.callback = callback;


    }
};
