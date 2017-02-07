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

controller.reviewsByUser = function (req, res, next) {
    Review.find({
            _hiker: req.body.id
        })
        .then(function (reviews) {
            res.status(200).json(reviews);
        }).catch(function (error) {
            next(error);
        });
};

controller.savedHikes = function (req, res, next) {
    Hike.find({
        _hiker: req.user.id
    }).then(function (success) {
        res.status(200).json(success);
    }).catch(function (error) {
        next(error);
    });
}

controller.saveHike = function (req, res, next) {

    Hike.update({
        _hiker: req.user.id
    }, {
        $addToSet: {
            hikes: parseInt(req.params.id)
        }
    }, {
        upsert: true
    }).then(function (success) {
        res.status(201).json(success);
    }).catch(function (error) {
        next(error);
    });

};

controller.findHikeById = function (req, res, next) {

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
                    next(error);
                });

        });

};

controller.findHikesByStateAndCity = function (req, res, next) {

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

controller.addReviewToHike = function (req, res, next) {
    Review.create({
        _hiker: req.user.id,
        hike: req.body.hike_id,
        review: req.body.review
    }).then(function (review) {

        res.status(201).json(review);

    }).catch(function (error) {
        next(error);
    });
}


module.exports = controller;