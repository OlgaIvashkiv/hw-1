const { userService } = require('../services');
const { OK, NO_CONTENT, CREATED } = require('../configs/error-codes');
const { errors: { USER_IS_UPDATED, USER_IS_DELETED } } = require('../error');
const { hash } = require('../helpers/password.helper');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const password = await hash(req.body.password);

            await userService.addUserToDB({ ...req.body, password });

            res.status(OK).json('User created');
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const allUsers = await userService.findAllUsersWithCars();

            res
                .status(OK)
                .json(allUsers);
        } catch (e) {
            next(e);
        }
    },
    findUserById: async (req, res, next) => {
        try {
            const [{
                id, name, email, age
            }] = req.user;
            await userService.findUserById(id);

            res
                .status(OK)
                .json({ name, email, age });
        } catch (e) {
            next(e);
        }
    },
    deleteUserById: async (req, res, next) => {
        try {
            const [{ id }] = req.user;

            await userService.deleteUserById(id);

            res
                .status(NO_CONTENT)
                .json({
                    message: USER_IS_DELETED.message
                });
        } catch (e) {
            next(e);
        }
    },
    getUsersOfAge: async (req, res, next) => {
        try {
            const result = await userService.findUsersByAge(req.params.age);

            res.status(OK)
                .json(result);
        } catch (e) {
            next(e);
        }
    },
    updateUserById: async (req, res, next) => {
        try {
            await userService.updateUserById(req.body, req.params.id);

            res.status(CREATED)
                .json({
                    message: USER_IS_UPDATED.message
                });
        } catch (e) {
            next(e);
        }
    },

};
