const { validationResult } = require('express-validator/check');

const Product = require('../models/product');

exports.getAccount = (req, res, next) => {
    res.render('pages/account', {});
}

exports.getLogin = (req, res, next) => {
    res.render('pages/login', {});
}

exports.getAccInfo = (req, res, next) => {
    res.render('pages/profile-info', {});
}

exports.getWishList = (req, res, next) => {
    res.render('pages/wishlist', {});
}

exports.getAddProduct = (req, res, next) => {
    res.render('pages/add-product', {
        editing: false,
        errorMessage: null,
        validationErrors: [],
        hasError: false
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const stock = req.body.stock;
    const brand = req.body.brand;
    const category = req.body.category;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('pages/add-product', {
            editing: false,
            hasError: true,
            product: { title, stock, brand, category, imageUrl, price, description },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }

    const product = new Product({
        title: title,
        stock: stock,
        brand: brand,
        category: category,
        price: price,
        description: description,
        imageUrl: imageUrl,
        //userId: req.user
    });

    product.save()
        .then(() => {
            res.redirect('/account');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

exports.getAdminProds = (req, res, next) => {
    // Product.find({ userId: req.user._id })
    Product.find()
    .then(products => {
            res.render('pages/admin-prods', {
                prods: products
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('pages/project1/add-product', {
                pageTitle: 'Edit Product',
                editing: editMode,
                product: product,
                hasError: false,
                errorMessage: null,
                validationErrors: []
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};