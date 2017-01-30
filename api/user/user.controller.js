let User = require('./user.model');
let controller = {};

controller.me = (req, res) => {
   res.status(200).json(req.user);
}

module.exports = controller;