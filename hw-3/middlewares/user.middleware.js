const dataBase = require('../dataBase/users-list');

module.exports = {
    checkIfUserIsInDB: (req, res, next) => {
        try {
            const { email } = req.body;
            const findUser = dataBase.find((user) => user.email === email);

            if (findUser) throw new Error('This user is already registered.');

            req.user = email;
            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
    checkUserEmail: (req, res, next) => {
        try {
            const { email } = req.params;
            const findUser = dataBase.find((user) => user.email === email);

            if (!findUser) throw new Error('No such email found in DB.');

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
