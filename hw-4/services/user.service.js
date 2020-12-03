const db = require('../dataBase').getInstance();

module.exports = {
    findAllUsers: () => {
        const UserModel = db.getModel('User');
        return UserModel.findAll();
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
        return UserModel.destroy({ name: 'Olia' }, {
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
