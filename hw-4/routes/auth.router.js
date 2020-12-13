const { Router } = require('express');
const { authMiddleware } = require('../middlewares');
const { authController } = require('../controllers');

const authrouter = Router();

authrouter.post('/', authMiddleware.findUserByEmail, authMiddleware.checkPasswordValidity, authController.getUser);

module.exports = authrouter;
