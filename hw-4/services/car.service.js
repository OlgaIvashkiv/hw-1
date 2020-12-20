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
    }
};
