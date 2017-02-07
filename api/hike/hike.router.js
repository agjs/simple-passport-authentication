const router = require('express').Router();
let controller = require('./hike.controller');
let authUtils = require('../../auth/auth.utils');

router.route('/uid=:id')
    .get(authUtils.isLoggedIn, controller.findHikeById)
    .post(authUtils.isLoggedIn, controller.saveHike);  

router.route('/uid=:id/reviews')
    .post(authUtils.isLoggedIn, controller.addReviewToHike);
    
router.route('/state=:state/city=:city')
    .get(authUtils.isLoggedIn, controller.findHikesByStateAndCity);

module.exports = router;    
