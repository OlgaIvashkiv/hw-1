const { carService } = require('../services');
const { OK, NO_CONTENT, CREATED } = require('../configs/error-codes');
const { errors: { CAR_IS_UPDATED, CAR_IS_DELETED } } = require('../error');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const allCars = await carService.findAllCars();

            res
                .status(OK)
                .json(allCars);
        } catch (e) {
            next(e);
        }
    },
    findUserById: async (req, res, next) => {
        try {
            const [{ id }] = req.car;
            const foundCar = await carService.findCarById(id);

            res
                .status(OK)
                .json(foundCar);
        } catch (e) {
            next(e);
        }
    },
    deleteCarById: async (req, res, next) => {
        try {
            const id = req.user;

            await carService.deleteCarById(id);

            res
                .status(NO_CONTENT)
                .json({
                    message: CAR_IS_DELETED.message
                });
        } catch (e) {
            next(e);
        }
    },
    updateCarById: async (req, res, next) => {
        try {
            await carService.updateCarById(req.body, req.params.id);

            res.status(CREATED)
                .json({
                    message: CAR_IS_UPDATED.message
                });
        } catch (e) {
            next(e);
        }
    },
};
