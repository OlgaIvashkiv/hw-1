const db = require('../dataBase').getInstance();

module.exports = {
    findUserByEmail: (email) => {
        const UserModel = db.getModel('User');
        return UserModel.findAll({
            where: {
                email
            }
        });
    }
};
