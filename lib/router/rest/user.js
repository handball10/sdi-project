/**
 * Created by flori on 02.07.2016.
 */

var db = require('../../database/Collection'),
    express = require('express'),
    moment = require('moment')
    ;

var user = db.getCollection('user');

var router = express.Router();


var user = db.getCollection('mensa');




router.get('/', function(req, res){

    console.log((moment('07.04'+(moment().year()), 'DD.MM.YYYY')).format('D. MMMM'));


    //user.insert({
    //    date : "07.04.",
    //    plan : "Gericht 1: Würstchen im Schlafrock. Gericht 2: Schnitzel mit Pommes"
    //});
    //
    //user.insert({
    //    date : "20.08.",
    //    plan : "Gericht 1: Nudeln mit Soße. Gericht 2: Schnitzel mit Paprika-Soße"
    //});

    //user.insert({
    //    number : "LL1",
    //    description : "Dieses fach findet alle 4 Wochen abwechselnd in Gießen und in Friedberg statt und wird unterrichtet von Althaus, Rupp und Glowalla."
    //});
    //user.insert({
    //    number : "LL1",
    //    description : "Dieses fach findet alle 4 Wochen abwechselnd in Gießen und in Friedberg statt und wird unterrichtet von Althaus, Rupp und Glowalla."
    //});
    //
    //user.insert({
    //    number : "LL1",
    //    description : "Dieses fach findet alle 4 Wochen abwechselnd in Gießen und in Friedberg statt und wird unterrichtet von Althaus, Rupp und Glowalla."
    //});
    //
    //user.insert({
    //    number : "LL1",
    //    description : "Dieses fach findet alle 4 Wochen abwechselnd in Gießen und in Friedberg statt und wird unterrichtet von Althaus, Rupp und Glowalla."
    //});
    //
    //user.insert({
    //    number : "LL1",
    //    description : "Dieses fach findet alle 4 Wochen abwechselnd in Gießen und in Friedberg statt und wird unterrichtet von Althaus, Rupp und Glowalla."
    //});


    res.sendStatus(200).end();
});

module.exports = router;