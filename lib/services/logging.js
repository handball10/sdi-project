/**
 * Created by flori on 30.06.2016.
 */
'use strict';

// imports
var database = require('../database/Collection'),
    Q = require('q')

;


module.exports = (function(){

    var loggingModel = require('../model/index').Log;


    var exp = {};

    exp.logEvent = function(event){
        return loggingModel.add(event);
    };

    return exp;

})();
