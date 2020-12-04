const { Router } = require('express');
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.post('/', userMiddleware.checkUserValidity, userMiddleware.checkDataValidity,
    userMiddleware.findUserByEmail, userController.createUser);

userRouter.get('/age/:age', userMiddleware.checkUserExistAge, userController.getUsersOfAge);

userRouter.get('/:id', userMiddleware.checkIdValidity, userMiddleware.checkUserExistId, userController.findUserById);

userRouter.delete('/:id', userMiddleware.checkIdValidity, userMiddleware.checkUserExistId, userController.deleteUserById);

userRouter.put('/:id', userMiddleware.checkIdValidity, userMiddleware.checkDataValidity,
    userMiddleware.checkUserExistId, userController.updateUserById);

module.exports = userRouter;
