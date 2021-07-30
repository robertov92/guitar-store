const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = 3000;
const MONGODB_URI = 'mongodb+srv://roberto:Unoyuno5@cluster0.zwdeu.mongodb.net/Project3?retryWrites=true&w=majority';

const shopRoutes = require('./routes');
const accountRoutes = require('./routes/account');

const app = express();

app.use(express.static('public'))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use(bodyParser({ extended: false }))
    .use('/account', accountRoutes)
    .use('/', shopRoutes);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        });
    });