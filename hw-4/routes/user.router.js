const { Router } = require('express');
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.post('/', userMiddleware.checkUserValidity, userMiddleware.checkIfUserIsInDB, userController.createUser);

userRouter.get('/:age', userController.getUsersOfAge);

userRouter.delete('/:id', userMiddleware.checkIdValidity, userController.deleteUserById);

module.exports = userRouter;
