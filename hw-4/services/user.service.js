const db = require('../dataBase').getInstance();

module.exports = {
    findUserById: (id) => {
        const UserModel = db.getModel('User');

        return UserModel.findAll({ where: { id } });
    },
    findAllUsers: () => {
        const UserModel = db.getModel('User');

        return UserModel.findAll();
    },
    addUserToDB: (user) => {
        const UserModel = db.getModel('User');
        return UserModel.create(user);
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
