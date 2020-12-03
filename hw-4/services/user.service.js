const db = require('../dataBase').getInstance();

module.exports = {
    findAllUsers: () => {
        const UserModel = db.getModel('User');
        return UserModel.findAll();
    },
    // addUserToDB: (user) => dataBase.push(user),
    // findUserByEmail: (user) => dataBase.filter((u) => u.email !== user),
    // deleteUserByEmail: (user) => dataBase.splice(user, 1)
};
