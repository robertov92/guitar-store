const routes = require('express').Router();
const { check, body } = require('express-validator/check');

const authControllers = require('../controllers/auth');
const alreadyLogedIn = require('../middleware/alreadyLogedIn');
const User = require('../models/user');

routes.get('/signup', alreadyLogedIn, authControllers.getSignup);

routes.post('/signup', [
    check('email').isEmail().withMessage('Please enter a valid email').custom((value, { req }) => {
        return User.findOne({ email: value })
            .then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Email already exists, please pick a different one');
                }
            });
    }),
    body('password', 'Please enter a password with only numbers and text, and at least 4 characters long').isLength({ min: 4 }).isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords have to match!')
        }
        return true;
    })
], authControllers.postSignup);

routes.get('/login', alreadyLogedIn, authControllers.getLogin);

routes.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password', 'Please enter a password with only numbers and text, and at least 4 characters long').isLength({ min: 4 }).isAlphanumeric()
], authControllers.postLogin);

routes.post('/logout', authControllers.postLogout);

module.exports = routes;