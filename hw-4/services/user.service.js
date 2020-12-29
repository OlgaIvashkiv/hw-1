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
    addUserToDB: (user, transaction) => {
        const UserModel = db.getModel('User');
        return UserModel.create(user, { transaction });
    },
    deleteUserById: (id) => {
        const UserModel = db.getModel('User');
        return UserModel.destroy({
            where: {
                id
            }
        });
    },
    updateUserById: (id, updatedData, transaction) => {
        const UserModel = db.getModel('User');

        return UserModel.update(
            { ...updatedData },
            {
                where: { id },
                transaction
            }
        );
    },

};
