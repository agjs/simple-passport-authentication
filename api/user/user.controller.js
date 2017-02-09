let unirest = require('unirest');
let User = require('./user.model');
let Hike = require('../hike/hike.model');
let Review = require('../hike/review.model');
let config = require('../../config');
let controller = {};


function filteredHikes(results) {

    for(let place of results.body.places) {
        for (let prop in place) {
            if (place[prop] == null || prop === 'activities') {
                delete place[prop];
            }
        }
        return place;
  }
}

controller.me = (req, res, next) => {

    let me = req.user.id;

    Hike.find({
        _hiker: me
    }).then(function (response) {

        var promises = [];

        for (let i = 0; i < response[0].hikes.length; i++) {
            promises.push(new Promise(function (resolve, reject) {
            
                unirest.get(`${config.trailapi.baseUrl}/?q[unique_id_eq]=${response[0].hikes[i]}`)
                    .header("X-Mashape-Key", config.trailapi.key)
                    .header("Accept", "text/plain")
                    .end(function (result) {
                        resolve(filteredHikes(result));
                    });
            }));
        }

        Promise.all(promises).then(function (results) {
            res.status(200).json({
                user: req.user,
                hikes: results
            });

        }, function (error) {
            next(error);
        });

    }).catch(function (error) {
        next(error);
    });


}

module.exports = controller;