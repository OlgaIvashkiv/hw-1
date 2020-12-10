const { Router } = require('express');
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.post('/', userMiddleware.checkDataValidity, userMiddleware.checkUserValidity,
    userMiddleware.findUserByEmail, userController.createUser);

userRouter.get('/age/:age', userMiddleware.checkUserExistAge, userController.getUsersOfAge);

userRouter.get('/:id', userMiddleware.checkIdValidity, userMiddleware.checkUserExistInBD, userController.findUserById);

userRouter.delete('/:id', userMiddleware.checkIdValidity, userMiddleware.checkUserExistInBD, userController.deleteUserById);

userRouter.put('/:id', userMiddleware.checkIdValidity, userMiddleware.checkDataValidity,
    userMiddleware.checkUserExistInBD, userController.updateUserById);

module.exports = userRouter;
