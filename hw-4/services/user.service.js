const db = require('../dataBase').getInstance();

module.exports = {
    findUserById: (id) => {
        const UserModel = db.getModel('User');

        return UserModel.findAll({where: { id }});
    },
    findAllUsersWithCars: () => {
        const UserModel = db.getModel('User');
        const CarModel = db.getModel('Car');

        return UserModel.findAll({
            include: {model: CarModel}
        });
    },
    addUserToDB: (user) => {
        const UserModel = db.getModel('User');
        return UserModel.create(user);
    },
    findUsersByAge: (age) => {
        const UserModel = db.getModel('User');
        return UserModel.findAll({
            where: {
                age
            }
        });
    },
    deleteUserById: (id) => {
        const UserModel = db.getModel('User');
        return UserModel.destroy({
            where: {
                id
            }
        });
    },
    updateUserById: (updatedData, id) => {
        const UserModel = db.getModel('User');
        return UserModel.update(updatedData, {
            where: {
                id
            }
        });
    }
};
