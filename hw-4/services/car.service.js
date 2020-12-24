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
    createCar: (car) => {
        const CarModel = db.getModel('Car');

        return CarModel.create(car);
    },
    updateSingleCarFiles: (data, carID) => {
        const File = db.getModel(FILE);
        return File.create(
            { file_path: data.file_path, file_type: data.file_type, carID },
            { where: { carID },
                returning: true },
        );
    },
};
