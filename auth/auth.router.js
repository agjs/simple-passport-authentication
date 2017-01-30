const passport = require('passport');
const router = require('express').Router();
let controller = require('./auth.controller');


router.route('/login')
    .post(passport.authenticate('local'), (req, res) => {
        res.status(200).json(req.user);
    });

router.route('/register')
    .post(controller.register);


module.exports = router;