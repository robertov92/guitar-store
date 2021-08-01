const routes = require('express').Router();

const adminControllers = require('../controllers/auth');

routes.get('/login', adminControllers.getLogin);

module.exports = routes;