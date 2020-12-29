const db = require('../dataBase').getInstance();

module.exports = {
    findCarById: (id) => {
        const CarModel = db.getModel('Car');

        return CarModel.findAll({ where: { id } });
    },
    findAllCars: () => {
        const CarModel = db.getModel('Car');

        return CarModel.findAll();
    },
    deleteCarById: (id) => {
        const CarModel = db.getModel('Car');

        return CarModel.destroy({
            where: {
                id
            }
        });
    },
    updateCarById: (updatedData, id) => {
        const CarModel = db.getModel('Car');
        return CarModel.update(updatedData, {
            where: {
                id
            }
        });
    },
    createCar: (car, transaction) => {
        const CarModel = db.getModel('Car');

        return CarModel.create(car, { transaction });
    },
    assignCarToUser: (car) => {
        const CarModel = db.getModel('User_2_Car');

        return CarModel.create(car);
    },
    updateSingleCarFiles: (data, transaction) => {
        const Carsfiles = db.getModel('Cars_files');
        return Carsfiles.create(data, { transaction });
    },
    deleteCarFiles: (car_id) => {
        const Carsfiles = db.getModel('Cars_files');

        return Carsfiles.destroy({
            where: {
                car_id
            }
        });
    }
};
