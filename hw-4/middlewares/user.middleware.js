const db = require('../dataBase').getInstance();

module.exports = {
    findUserByEmail: (req, res, next) => {
        try {
            const { email } = req.body;
            const UserModel = db.getModel('User');
            const findUser = UserModel.findAll({
                where: {
                    email
                }
            });

            if (findUser) throw new Error('This user is already registered.');

            req.user = email;
            next();
        } catch (e) {
            res.status(400)
                .json(e.message);
        }
    },
    checkUserValidity: (req, res, next) => {
        try {
            const { age, email, password } = req.body;
            if (age < 13 || email.length < 8 || password.length < 6) {
                throw new Error('This user data is not valid');
            }
            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    checkIdValidity: (req, res, next) => {
        try {
            const { id } = req.params;

            if (id <= 0 || !typeof (Number)) throw new Error('ID must be type of number and greater than 0.');

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    checkDataValidity: (req, res, next) => {
        try {
            const { age, email, password } = req.body;

            if (age && age < 13) throw new Error('This data is not valid');

            if (email && email.length < 8) throw new Error('This data is not valid');

            if (password && password.length < 6) throw new Error('This data is not valid');

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    checkUserExistinBD: async (req, res, next) => {
        try {
            const { id } = req.params;
            const UserModel = db.getModel('User');
            const findUser = await UserModel.findAll({
                where: {
                    id
                }
            });

            if (!findUser) throw new Error('This user is not registered.');

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    checkUserExistId: (req, res, next) => {
        try {
            const { id } = req.params;
            const UserModel = db.getModel('User');
            const findUser = UserModel.findAll({
                where: {
                    id
                }
            });

            if (!findUser) throw new Error('This user is not registered.');

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    checkUserExistAge: (req, res, next) => {
        try {
            const { age } = req.params;
            const UserModel = db.getModel('User');
            const findUser = UserModel.findAll({
                where: {
                    age
                }
            });

            if (findUser) throw new Error('This user is not registered.');

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
