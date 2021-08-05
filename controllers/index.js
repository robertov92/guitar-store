const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req, res, next) => {
    Product.find().limit(4)
        .then(products => {
            res.render('pages/home', {
                pageTitle: 'Home',
                prods: products
            });
        })
}

exports.getCatalog = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('pages/catalog', {
                pageTitle: 'Shop',
                prods: products,
                filteredBrands: [],
                filteredCategories: [],
                min: null,
                max: null
            });
        });
}

exports.getSearchedCatalog = (req, res, next) => {
    const search = req.query.search
    Product.find({ $or: [{ title: { $regex: search, $options: "i" } }, { brand: { $regex: search, $options: "i" } }, { category: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }] })
        .then(products => {
            res.render('pages/catalog', {
                pageTitle: 'Shop',
                prods: products,
                filteredBrands: [],
                filteredCategories: [],
                min: null,
                max: null
            });
        });
}

exports.getFilteredCatalog = (req, res, next) => {
    const filteredBrands = req.query.brand || ['Gibson', 'Fender', 'Ibanez', 'Epiphone', 'Squire', 'Yamaha', 'Other'];
    const filteredCategories = req.query.category || ['Electric', 'Acoustic', 'Electroacoustic', 'Bass', 'Accessory', 'Other'];
    const min = req.query.min || 1;
    const max = req.query.max || 9999999;
    Product.find({ category: filteredCategories, brand: filteredBrands, price: { $gte: min, $lte: max } })
        .then(products => {
            res.render('pages/catalog', {
                pageTitle: 'Shop',
                prods: products,
                filteredBrands,
                filteredCategories,
                min,
                max
            });
        });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            //skip the same file, use .skip()
            Product.find({ _id: { $ne: product._id } }).limit(4)
                .then(products => {
                    res.render('pages/product-details', {
                        pageTitle: 'Product Details',
                        product,
                        products
                    })
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
                pageTitle: 'Your Cart',
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
                pageTitle: 'Your Wishlist',
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

// gets orders to be displayed
exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('pages/orders', {
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

// saves cart into order collection
exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: {...i.productId._doc } };
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(() => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/project1/500');
        });
};

exports.getContact = (req, res, next) => {
    res.render('pages/contact-us', { pageTitle: 'Contact Us' })
}