const bcrypt = require('bcrypt');
let User = require('../api/user/user.model');
let controller = {};

controller.login = (req, res) => {
    res.send('You posted to /login!');
}

controller.register = (req, res) => {
    bcrypt.genSalt(5, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {

            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            }, (error, user) => {

                return new Promise((resolve, reject) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(user);
                    }
                }).then((user) => {
                    res.status(201).json(user);
                }).catch((error) => {
                    res.status(400).json(error.message);
                });

            });
        });
    });
}

module.exports = controller;