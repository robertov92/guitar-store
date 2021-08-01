const routes = require('express').Router();
const shopControllers = require('../controllers/index');

routes.get('/shop', shopControllers.getCatalog);

routes.get('/shop/:productId', shopControllers.getProduct);

routes.get('/cart', shopControllers.getCart);

routes.post('/cart', shopControllers.postCart);

routes.get('/', shopControllers.getIndex);

module.exports = routes;