const routes = require('express').Router();
const { check, body } = require('express-validator/check');

const accountControllers = require('../controllers/account');
const isAuth = require('../middleware/is-auth');


routes.get('/add-product', isAuth, accountControllers.getAddProduct);

routes.post('/add-product', isAuth, [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('stock').isInt(),
    body('brand').isString().isLength({ min: 3 }).trim(),
    body('category').isString().isLength({ min: 3 }).trim(),
    body('price').isFloat(),
    body('imageUrl').isURL(),
    body('description').isLength({ min: 8, max: 400 }).trim()
], accountControllers.postAddProduct);

routes.get('/edit-product/:productId', isAuth, accountControllers.getEditProduct);

routes.post('/edit-product', isAuth, [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('stock').isInt(),
    body('brand').isString().isLength({ min: 3 }).trim(),
    body('category').isString().isLength({ min: 3 }).trim(),
    body('price').isFloat(),
    body('imageUrl').isURL(),
    body('description').isLength({ min: 8, max: 400 }).trim()
], accountControllers.postEditProduct);

routes.post('/delete-product', isAuth, accountControllers.postDeleteProduct);

routes.get('/admin-prods', isAuth, accountControllers.getAdminProds);

routes.get('/', isAuth, accountControllers.getAccount);


module.exports = routes;