/**
 * Created by flori on 02.07.2016.
 */

var db = require('../../database/Collection'),
    express = require('express');

var user = db.getCollection('user');

var router = express.Router();


var user = db.getCollection('user');




router.get('/', function(req, res){
    user.insert({
        matrikelNumber : Math.floor(Math.random()*99999+10000),
        ani : Math.floor(Math.random()*99999+10000),
        pin : Math.floor(Math.random()*9999+1000)
    });

    res.sendStatus(200).end();
});

module.exports = router;