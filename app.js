require('dotenv/config');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const shopRoutes = require('./routes');
const accountRoutes = require('./routes/account');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.static('public'))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use(bodyParser({ extended: false }))
    .use('/account', accountRoutes)
    .use(authRoutes)
    .use(shopRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`)
        });
    });