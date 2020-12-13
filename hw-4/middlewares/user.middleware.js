const db = require('../dataBase').getInstance();
const { userService } = require('../services');
const { ErrorHandler, errors: { USER_ALREADY_IN_DB, USER_NOT_REGISTERED } } = require('../error');
const { BAD_REQUEST } = require('../configs/error-codes');
const { idValidator, newUserValidator, updateUserValidator } = require('../validators');

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
            const { error } = newUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIdValidity: (req, res, next) => {
        try {
            const { id } = req.params;
            const { error } = idValidator.validate(id);

            if (error) throw new ErrorHandler(error.details[0].message, BAD_REQUEST);

            next();
        } catch (e) {
            next(e);
        }
    },
    checkDataValidity: (req, res, next) => {
        try {
            const { error } = updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkUserExistInBD: async (req, res, next) => {
        try {
            const { id } = req.params;
            const findUser = await userService.findUserById(id);
            console.log(findUser, '******');
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
