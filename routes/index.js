const routes = require('express').Router();

const shopControllers = require('../controllers/index');
const isAuth = require('../middleware/is-auth');


routes.get('/shop', shopControllers.getCatalog);

routes.get('/shop/:productId', shopControllers.getProduct);

routes.get('/cart', isAuth, shopControllers.getCart);

routes.post('/cart', isAuth, shopControllers.postCart);

routes.post('/reduce-cart', isAuth, shopControllers.reduceCart);

routes.post('/cart-delete-item', isAuth, shopControllers.postCartDeleteProduct);

routes.get('/wishlist', isAuth, shopControllers.getWishlist);

routes.post('/wishlist', isAuth, shopControllers.postWishlist);

routes.post('/wishlist-delete-item', isAuth, shopControllers.postWishlistDeleteProduct);

routes.post('/create-order', isAuth, shopControllers.postOrder);

routes.get('/orders', isAuth, shopControllers.getOrders);

routes.get('/shop-filter', shopControllers.getFilteredCatalog);

routes.get('/shop-search', shopControllers.getSearchedCatalog);

routes.get('/contact-us', shopControllers.getContact);

routes.get('/', shopControllers.getIndex);


module.exports = routes;