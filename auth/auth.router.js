const passport = require('passport');
const router = require('express').Router();
let controller = require('./auth.controller');


router.route('/login')
    .post(passport.authenticate('local'), (req, res) => {
        if(req.user) {
            res.status(200).json(req.user);
        } else {
            res.status(500).json('Wrong username or password');
        }
    });

router.route('/register')
    .post(controller.register);


module.exports = router;