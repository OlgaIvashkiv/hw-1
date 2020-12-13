const db = require('../dataBase').getInstance();
const { userService } = require('../services');
const {
    ErrorHandler, errors: {
        NOT_VALID_ID, NOT_VALID_BODY, USER_ALREADY_IN_DB, USER_NOT_REGISTERED
    }
} = require('../error');

module.exports = {
    findUserByEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const UserModel = db.getModel('User');
            const findUser = await UserModel.findAll({
                where: {
                    email
                }
            });

            if (findUser.length) throw new ErrorHandler(USER_ALREADY_IN_DB.message, USER_ALREADY_IN_DB.code);

            req.user = email;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkUserValidity: (req, res, next) => {
        try {
            const { age, email, password } = req.body;
            if (age < 13 || email.length < 8 || password.length < 6) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIdValidity: (req, res, next) => {
        try {
            const { id } = req.params;

            if (id <= 0 || !typeof (Number)) throw new ErrorHandler(NOT_VALID_ID.message, NOT_VALID_ID.code);

            next();
        } catch (e) {
            next(e);
        }
    },
    checkDataValidity: (req, res, next) => {
        try {
            const {
                age, email, password, ...other
            } = req.body;

            if (!age || !email || !password || other) throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);

            if (age && age < 13) throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);

            if (email && email.length < 6) throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);

            if (password && password.length < 6) throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);

            next();
        } catch (e) {
            next(e);
        }
    },
    checkUserExistInBD: async (req, res, next) => {
        try {
            const { id } = req.params;
            const findUser = await userService.findUserById(id);

            if (!findUser.length) throw new ErrorHandler(USER_NOT_REGISTERED.message, USER_NOT_REGISTERED.code);

            req.user = findUser;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkUserExistAge: async (req, res, next) => {
        try {
            const { age } = req.params;
            const UserModel = db.getModel('User');
            const findUser = await UserModel.findAll({
                where: {
                    age
                }
            });

            if (!findUser.length) throw new ErrorHandler(USER_NOT_REGISTERED.message, USER_NOT_REGISTERED.code);

            next();
        } catch (e) {
            next(e);
        }
    },
};
