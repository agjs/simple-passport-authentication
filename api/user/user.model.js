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


userSchema.methods.validPassword = function (password) {
    return bcrypt.compare(password, this.password, (err, res) => {
        console.log(password + " : " + this.password);
        console.log('Password match!');
        return res;
    });
}


module.exports = mongoose.model('User', userSchema);