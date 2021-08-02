const routes = require('express').Router();
const shopControllers = require('../controllers/index');

routes.get('/shop', shopControllers.getCatalog);

routes.get('/shop/:productId', shopControllers.getProduct);

routes.get('/cart', shopControllers.getCart);

routes.post('/cart', shopControllers.postCart);

routes.post('/reduce-cart', shopControllers.reduceCart);

routes.post('/cart-delete-item', shopControllers.postCartDeleteProduct);

routes.get('/wishlist', shopControllers.getWishlist);

routes.post('/wishlist', shopControllers.postWishlist);

routes.post('/wishlist-delete-item', shopControllers.postWishlistDeleteProduct);

routes.get('/', shopControllers.getIndex);

module.exports = routes;