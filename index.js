/**
 * Main application file for VoiceXML RESTful service.
 */

'use strict';

// main imports
var express = require('express'),
    winston = require('winston'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    nconf = require('nconf'),
    Q = require('q'),
    Router = require('./lib/router/rest/main.js')

;

// instantiate express router
var app = express(),
    router
;


// get the config
nconf
    .file({
        file: __dirname + '/config.json'
    })
    .argv()
    .env();


// Configure winston
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp': true});

// Configure Express
// remove flag
app.disable('x-powered-by');

// Parsing JSON
app.use(bodyParser.json({strict: true}));


Q().then(function(){
    // Start the HTTP-server
    app.listen(nconf.get('http:port'), nconf.get('http:ip'));

    var router = new Router();

    app.use('/xml', router.xml);

    //app.use('/api', router.validateRequest);
    //app.use('/api', router.performGateway);
    //app.use('/tokenizer', router.tokenizer);

}).catch(function (err) {
    winston.error(err || 'There is no error description available');
    process.exit(1);
});

//   "mongodb": "^1.4.10",
