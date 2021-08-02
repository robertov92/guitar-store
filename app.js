require('dotenv/config');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const shopRoutes = require('./routes');
const accountRoutes = require('./routes/account');
const authRoutes = require('./routes/auth');

const app = express();
const store = new MongoDBStore({ uri: process.env.MONGODB_URI, collection: 'sessions' });

app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }))
    .use(flash())
    .use((req, res, next) => {
        res.locals.isAuthenticated = req.session.isLoggedIn;
        next();
    });

const User = require('./models/user');

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            // gets the total number of items in cart
            res.locals.cartItems = user.cart.items.reduce((total, num) => total + num.quantity, 0);
            // gets the wishlist length
            res.locals.wishlistItems = user.wishlist.items.length;
            next();
        })
        .catch(err => {
            throw new Error(err);
        });

});

app.use(express.static('public'))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use(bodyParser({ extended: false }))
    .use('/account', accountRoutes)
    .use(authRoutes)
    .use(shopRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`)
        });
    });