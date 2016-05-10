'use strict';

module.exports = function Model(database){

    this.Session = require('./Session')(database.getCollection('session'));
    this.User = database.getCollection('User');

    return this;

};