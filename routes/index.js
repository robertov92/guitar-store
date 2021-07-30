const routes = require('express').Router();
const shopControllers = require('../controllers/index');

routes.get('/shop', shopControllers.getCatalog);

routes.get('/shop/:productId', shopControllers.getProduct);

routes.get('/checkout', shopControllers.getCart)

routes.get('/', shopControllers.getIndex);

module.exports = routes;