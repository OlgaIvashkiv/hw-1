const { Router } = require('express');
const { carController } = require('../controllers');
const {
    authMiddleware: { checkAccessToken },
    carMiddleware: { carMiddleware },
    fileMiddleware: { checkFileValidity, checkFileQty },
    userMiddleware: { userMiddleware }
} = require('../middlewares');

const carRouter = Router();

carRouter.get('/', carController.getAllCars);

carRouter.get('/:id',
    userMiddleware.checkIdValidity,
    carMiddleware.checkCarExistInBD,
    // checkAccessToken,
    carController.findCarById);

carRouter.post('/:id',
    userMiddleware.checkIdValidity,
    userMiddleware.checkUserExistInBD,
    // checkAccessToken,
    carMiddleware.checkDataValidity,
    checkFileValidity,
    checkFileQty,
    carController.createNewCar);

carRouter.delete('/:id',
    userMiddleware.checkIdValidity,
    carMiddleware.checkCarExistInBD,
    // checkAccessToken,
    carController.deleteCarById);

carRouter.put('/:id',
    userMiddleware.checkIdValidity,
    carMiddleware.checkDataValidity,
    carMiddleware.checkCarExistInBD,
    checkFileValidity,
    checkFileQty,
    // checkAccessToken,
    carController.updateCarById);

module.exports = carRouter;
