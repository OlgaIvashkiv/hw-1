const { Router } = require('express');
const { authMiddleware: { authMiddlewares } } = require('../middlewares');
const { authController } = require('../controllers');

const authrouter = Router();

authrouter.post('/', authMiddlewares.findUserByEmail, authMiddlewares.checkPasswordValidity, authController.login);

module.exports = authrouter;
