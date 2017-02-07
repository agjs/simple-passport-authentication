let unirest = require('unirest');
let User = require('./user.model');
let Hike = require('../hike/hike.model');
let Review = require('../hike/review.model');
let config = require('../../config');
let controller = {};


function filteredHikes(results) {

    let filtered = results.body.places.filter(function (place) {
        for (let prop in place) {

            if (place[prop] == null || prop === 'activities') {
                delete place[prop];
            }
        }
        return place;
    });

    return filtered;
}

controller.me = (req, res, next) => {

    let me = req.user.id;


    Hike.find({
        _hiker: me
    }).then(function (response) {

        let filteredHikes = response[0].hikes.map(function (id) {
            
            unirest.get(`${config.trailapi.baseUrl}/?q[unique_id_eq]=${id}`)
                .header("X-Mashape-Key", config.trailapi.key)
                .header("Accept", "text/plain")
                .end(function (result) {
                    return result;

                });
        });


// TODO TODO TODO

    }).catch(function (error) {
        next(error);
    });


}

module.exports = controller;