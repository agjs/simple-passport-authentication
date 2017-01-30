const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../api/user/user.model');

module.exports = new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password'
    
}, (email, password, done) => {

    User.findOne({
        email: email
    }, (err, user) => {

        return new Promise((resolve, reject) => {

            if (err) {
                reject(err);
            }
            
            if (!user) {
                reject(new Error('Your username is incorrect'));
            }

            user.validPassword(password, (error, matches) => {
                if(error) {
                    reject(error);
                }
                matches ? resolve(user) : reject(new Error('Wrong username or password'));
            });

        }).then((user) => {
            done(null, user)
        }).catch((error) => {
            done(error);
        });
    });
})