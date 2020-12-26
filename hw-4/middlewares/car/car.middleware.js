const { carService } = require('../../services');
const { ErrorHandler, errors: { CAR_NOT_REGISTERED } } = require('../../error');
const { BAD_REQUEST } = require('../../configs/error-codes');
const { carValidator } = require('../../validators');

module.exports = {
    checkCarExistInBD: async (req, res, next) => {
        try {
            const { id } = req.params;
            const findCar = await carService.findCarById(id);

            if (!findCar.length) throw new ErrorHandler(CAR_NOT_REGISTERED.message, CAR_NOT_REGISTERED.code);

            req.car = findCar;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkDataValidity: (req, res, next) => {
        try {
            const { error } = carValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
