const { Router } = require('express');
const { carController } = require('../controllers');
const {
    carMiddleware: { carMiddleware }, userMiddleware: { userMiddleware }
} = require('../middlewares');

const carRouter = Router();

carRouter.get('/', carController.getAllCars);

carRouter.get('/:id', userMiddleware.checkIdValidity, carMiddleware.checkCarExistInBD,
    carController.findUserById);

carRouter.delete('/:id', userMiddleware.checkIdValidity, carMiddleware.checkCarExistInBD,
    carController.deleteCarById);

carRouter.put('/:id', userMiddleware.checkIdValidity, carMiddleware.checkDataValidity,
    carMiddleware.checkCarExistInBD, carController.updateCarById);

module.exports = carRouter;
