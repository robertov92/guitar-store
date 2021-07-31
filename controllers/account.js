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

// gets 'Add Product' page
exports.getAddProduct = (req, res, next) => {
    res.render('pages/add-product', {
        editing: false,
        errorMessage: null,
        validationErrors: [],
        hasError: false
    });
}

// gets and populates edit page (which is also the add page)
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/account/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/account');
            }
            res.render('pages/add-product', {
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

// adds product on database
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

// edits a product in database
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedStock = req.body.stock;
    const updatedBrand = req.body.brand;
    const updatedCategory = req.body.category;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('pages/add-product', {
            editing: true,
            hasError: true,
            product: { title: updatedTitle, stock:updatedStock, brand:updatedBrand, category:updatedCategory, imageUrl: updatedImageUrl, price: updatedPrice, description: updatedDesc, _id: prodId },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }
    Product.findById(prodId)
    .then(product => {
            // ***user validation***
            // if (product.userId.toString() !== req.user._id.toString()) {
            //     return res.redirect('/account/');
            // }
            product.title = updatedTitle;
            product.stock = updatedStock;
            product.brand = updatedBrand;
            product.category = updatedCategory;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.imageUrl = updatedImageUrl;
            return product.save().then(() => {
                res.redirect('/account/admin-prods');
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

// deletes a product from database
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    //User security
    //Product.deleteOne({ _id: prodId, userId: req.user._id })
    Product.deleteOne({ _id: prodId })
        .then(() => {
            res.redirect('/account/admin-prods');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

// gets Admin-Prods page
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