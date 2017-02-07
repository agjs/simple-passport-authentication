const mongoose = require('mongoose');
const schema = mongoose.Schema;

let hikeSchema = new schema({
    _hiker: schema.Types.ObjectId,
    hikes: [Number]
});


module.exports = mongoose.model('Hike', hikeSchema);
