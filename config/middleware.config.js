const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const strategy = require('../auth/auth.local_strategy');
const User = require('../api/user/user.model');


module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false,
    }));
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }));

    passport.use(strategy);
    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

}