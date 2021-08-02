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
            req.user.removeFromWishlist(prodId);
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

// reduces product from cart
exports.reduceCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.reduceFromCart(product);
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

// deletes product from cart
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .removeFromCart(prodId)
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

// gets wishlist page
exports.getWishlist = (req, res, next) => {
    req.user
        .populate('wishlist.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.wishlist.items;
            res.render('pages/wishlist', {
                //pageTitle: 'Your Wishlist',
                products: products
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

// adds product to wishlist
exports.postWishlist = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToWishlist(product);
        })
        .then(() => {
            res.redirect('/wishlist');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

// deletes product from wishlist
exports.postWishlistDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .removeFromWishlist(prodId)
        .then(() => {
            res.redirect('/wishlist');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};