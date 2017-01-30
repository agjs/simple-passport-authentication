const express = require('express');
const mongoose = require('mongoose');

let app = express();


mongoose.connect('mongodb://localhost/passport-authentication');

require('./config/middleware.config')(app);

app.use('/auth', require('./auth/auth.router'));
app.use('/user', require('./api/user/user.router'));

app.listen(5000, () => {
    console.log('Express server!');
});