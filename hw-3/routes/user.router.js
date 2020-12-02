const { Router } = require('express');
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.post('/', userMiddleware.checkIfUserIsInDB, userController.createUser);

userRouter.get('/:email', userMiddleware.checkUserEmail, userController.getUserByEmail);

userRouter.delete('/:email', userMiddleware.checkUserEmail, userController.deleteUserByEmail);

module.exports = userRouter;
