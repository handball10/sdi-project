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
    Router = require('./lib/router/rest/main'),
    helmet = require('helmet'),
    database = require('./lib/database/collection'),
    Model = require('./lib/model/index'),
    moment = require('moment')
;

// instantiate express router
var app = express(),
    router
;

moment.locale('de');


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

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(helmet());


database.connect()
.then(function(){

    var model = new Model(database);
    var router = new Router(model);

    app.use('/user', router.user);
    app.use('/:api', router.validator);
    app.use('/:api/session', router.session);
    app.use('/:api/', router.validateSessionID);
    app.use('/:api/course', router.course);
    app.use('/:api/mensa', router.mensa);
    app.use('/:api/authenticate', router.authenticate);
    app.use('/:api/goodby', router.goodby);
    app.use('/:api/test', router.test);
    //app.use('/:api/:sessionID/xml', router.xml);


    // Start the HTTP-server
    app.listen(process.env.PORT || nconf.get('http:port'), nconf.get('http:ip'));

    //app.use('/api', router.validateRequest);
    //app.use('/api', router.performGateway);
    //app.use('/tokenizer', router.tokenizer);

}).catch(function (err) {
    winston.error(err || 'There is no error description available');
    process.exit(1);
});

//   "mongodb": "^1.4.10",
