let Hike = require('./hike.model');
let Review = require('./review.model');
let unirest = require('unirest');
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

controller.reviewsByUser = function (req, res) {

    Review.find({
            _hiker: req.body.id
        })
        .then(function (reviews) {
            res.status(200).json(reviews);
        }).catch(function (error) {
            console.log(error);
        });
};

controller.savedHikes = function (req, res) {

    let hike = new Hike({
        _hiker: req.user.id
    });

    hike.hikes.addToSet(req.body.unique_id);
    hike.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Created');
        }
    });
};

controller.findHikeById = function (req, res) {

    let {
        id,
    } = req.params;

    let url = `${config.trailapi.baseUrl}/?q[unique_id_eq]=${id}`;

    unirest.get(url)
        .header("X-Mashape-Key", config.trailapi.key)
        .header("Accept", "text/plain")
        .end(function (result) {

            Review.find({
                    hike: id
                })
                .then(function (reviews) {

                    let results = {
                        hike: filteredHikes(result),
                        reviews: reviews
                    }

                    res.status(200).json(results);

                }).catch(function (error) {
                    console.log(error);
                });

        });

};

controller.findHikesByStateAndCity = function (req, res) {

    let {
        city,
        state
    } = req.params;

    let url = `${config.trailapi.baseUrl}/?q[activities_activity_type_name_eq]=hiking&q[city_cont]=${city}&q[state_cont]=${state}`;

    unirest.get(url)
        .header("X-Mashape-Key", config.trailapi.key)
        .header("Accept", "text/plain")
        .end(function (result) {
            res.status(200).json(filteredHikes(result));
        });
};

controller.addReviewToHike = function (req, res) {
    Review.create({
        _hiker: req.user.id,
        hike: req.body.hike_id,
        review: req.body.review
    }).then(function (review) {

        res.status(201).json(review);

    }).catch(function (error) {
        console.log(error);
    });
}


module.exports = controller;