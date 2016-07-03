/**
 * Created by flori on 02.07.2016.
 */

var db = require('../../database/Collection'),
    express = require('express');

var user = db.getCollection('user');

var router = express.Router();


var user = db.getCollection('mensa');




router.get('/', function(req, res){
    user.insert({
        number : "LL1",
        description : "Dieses Fach findet alle 4 Wochen abwechselnd in Gießen und in Friedberg statt und wird unterrichtet von Althaus, Rupp und Glowalla. Räume und Uhrzeiten variieren.!"
    });

    user.insert({
        number : "TBN",
        description : "TBN findet wöchentlich dienstags um 10 Uhr 30 in Raum B210 statt und wird von Behrends unterrichtet."
    });

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