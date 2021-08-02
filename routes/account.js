const routes = require('express').Router();
const { check, body } = require('express-validator/check');

const accountControllers = require('../controllers/account');

routes.get('/info', accountControllers.getAccInfo);

routes.get('/add-product', accountControllers.getAddProduct);

routes.post('/add-product', [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('stock').isInt(),
    body('brand').isString().isLength({ min: 3 }).trim(),
    body('category').isString().isLength({ min: 3 }).trim(),
    body('price').isFloat(),
    body('imageUrl').isURL(),
    body('description').isLength({ min: 8, max: 400 }).trim()
], accountControllers.postAddProduct);

routes.get('/edit-product/:productId', accountControllers.getEditProduct);

routes.post('/edit-product', [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('stock').isInt(),
    body('brand').isString().isLength({ min: 3 }).trim(),
    body('category').isString().isLength({ min: 3 }).trim(),
    body('price').isFloat(),
    body('imageUrl').isURL(),
    body('description').isLength({ min: 8, max: 400 }).trim()
], accountControllers.postEditProduct);

routes.post('/delete-product', accountControllers.postDeleteProduct);

routes.get('/admin-prods', accountControllers.getAdminProds);

routes.get('/', accountControllers.getAccount);

module.exports = routes;