const { Router } = require('express');
const { authMiddleware, userMiddleware: { userMiddleware } } = require('../middlewares');
const { authController } = require('../controllers');

const authRouter = Router();

authRouter.post('/',
    authMiddleware.authMiddlewares.findUserByEmail,
    authMiddleware.authMiddlewares.checkPasswordValidity,
    authController.login);

authRouter.get('/logout', authController.logoutUser);

authRouter.post('/:id/refresh',
    userMiddleware.checkIdValidity,
    userMiddleware.checkUserExistInBD,
    authMiddleware.checkRefreshToken,
    authController.refreshTokenPair);

module.exports = authRouter;
