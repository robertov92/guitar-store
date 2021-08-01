const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    res.render('pages/home', {});
}

exports.getCatalog = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('pages/catalog', {
                prods: products
            });
        });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render('pages/product-details', {
                product: product
            });
        })
        .catch(err => {
            console.log(err);
            // this is a database fail becase the product isn't found,
            // though I am sending the user to 404 because it seems to him that the page isn' found
            res.redirect('/404');
        });
}

// gets cart page
exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items;
            res.render('pages/cart', {
                //pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

// adds product to cart
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};