const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

let app = express();

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/passport-authentication');

require('./config/middleware.config')(app);


app.use('/auth', require('./auth/auth.router'));
app.use('/api/users', require('./api/user/user.router'));
app.use('/api/hikes', require('./api/hike/hike.router'));

app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(5000, () => {
    console.log('Express server!');
});