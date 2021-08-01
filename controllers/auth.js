const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');

exports.getSignup = (req, res, next) => {
    res.render('pages/signup', {
        errorMessage: req.flash('error'),
        oldInput: { email: '', password: '', confirmPassword: '' },
        validationErrors: []
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('pages/signup', {
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email: email,
                password: password,
                confirmPassword: req.body.confirmPassword
            },
            validationErrors: errors.array()
        });
    }
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                cart: { items: [] }
            });
            return user.save();
        })
        .then(() => {
            res.redirect('/login');
            /*
            return transporter.sendMail({
                to: email,
                from: 'vil13004@byui.edu',
                subject: 'Signup succeeded',
                html: '<h1>Success!</h1>'
            });
            */

        }).catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

exports.getLogin = (req, res, next) => {
    res.render('pages/login', {});
}