/**
 * Created by flori on 28.04.2016.
 */


'use strict';

module.exports = (function(){

    /**
     * Defines namespace for module
     * @type {{}}
     */
    var module = {};

    /**
     * Creates a new regex matching param validator.
     * If the param value doesn't match the regexp, the router will send a 400 (Bad request) response.
     * @param re RegExp The reg
     * @returns {Function}
     */
    module.createRegExpParameter = function (re){
        return function(req, res, next, val){
            // test input against the regexp
            re.test(String(val)) ? next() : res.sendStatus(400);
        }
    };

    /**
     * Collection of route pattern
     * @type {{tenDigit: Function}}
     */
    module.validators = {
        tenDigit : module.createRegExpParameter(/^[0-9]{1,10}$/)
    };

    return module;

})();
