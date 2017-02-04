const mongoose = require('mongoose');
const schema = mongoose.Schema;

let reviewSchema = new schema({
    _hiker: schema.Types.ObjectId,
    hike: {
        type: Number
    },
    review: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Review', reviewSchema);