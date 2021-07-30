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

exports.getCart = (req, res, next) => {
    res.render('pages/checkout', {});
}