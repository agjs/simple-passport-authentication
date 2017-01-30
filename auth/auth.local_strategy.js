const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../api/user/user.model');

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    console.log('Console.log from local strategy!');
    User.findOne({
        email: email
    }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'Incorrect username.'
            });
        }
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: 'Incorrect password.'
            });
        }
        return done(null, user);
    });
})