const { Router } = require('express');
const { authMiddleware: { authMiddlewares } } = require('../middlewares');
const { authController } = require('../controllers');

const authRouter = Router();

authRouter.post('/', authMiddlewares.findUserByEmail, authMiddlewares.checkPasswordValidity, authController.login);
authRouter.get('/logout', authController.logoutUser);

module.exports = authRouter;
