const { Router } = require('express');
const { userController } = require('../controllers');
const { authMiddleware: { checkAccessToken }, fileMiddleware, userMiddleware: { userMiddleware } } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.post('/',
    userMiddleware.checkUserValidity,
    userMiddleware.findUserByEmail,
    fileMiddleware.checkAvatar,
    userController.createUser);

userRouter.get('/:id',
    userMiddleware.checkIdValidity,
    userMiddleware.checkUserExistInBD,
    userController.findUserWithCarById);

userRouter.delete('/:id',
    userMiddleware.checkIdValidity,
    userMiddleware.checkUserExistInBD,
    // checkAccessToken,
    userController.deleteUserById);

userRouter.put('/:id',
    userMiddleware.checkIdValidity,
    userMiddleware.checkDataValidity,
    userMiddleware.checkUserExistInBD,
    fileMiddleware.checkAvatar,
    // checkAccessToken,
    userController.updateUserById);

module.exports = userRouter;
