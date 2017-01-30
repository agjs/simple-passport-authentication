const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;

let userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String
});


userSchema.methods.validPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (error, res) => {
        return new Promise((resolve, reject) => {

        error ? reject(error) : resolve(res);

        }).then((response) => {
            callback(null, response);
        }).catch((error) => {
            callback(error);
        });

    });
}

module.exports = mongoose.model('User', userSchema);

