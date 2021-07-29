const routes = require('express').Router();
const accountControllers = require('../controllers/account');

routes.get('/login', accountControllers.getLogin);

routes.get('/info', accountControllers.getAccInfo);

routes.get('/wishlist', accountControllers.getWishList);

routes.get('/', accountControllers.getAccount);

module.exports = routes;