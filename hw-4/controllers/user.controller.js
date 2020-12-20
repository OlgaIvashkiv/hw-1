const { Op } = require('sequelize');
const { userService } = require('../services');
const { OK, NO_CONTENT, CREATED } = require('../configs/error-codes');
const { errors: { USER_IS_UPDATED, USER_IS_DELETED } } = require('../error');
const { hash } = require('../helpers/password.helper');

const db = require('../dataBase').getInstance();

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
            const allUsers = await userService.findAllUsers();

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
            const id = req.user;

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
    findUserWithCarById: async (req, res) => {
        const User = db.getModel('User');
        const User_2_Car = db.getModel('User_2_Car');
        const Car = db.getModel('Car');

        const { id } = req.params;

        let user = await User.findByPk(id);

        user = user && user.dataValues;

        const relations = await User_2_Car.findAll({
            where: {
                user_id: id
            }
        });

        const car_ids = relations.map((relation) => relation && relation.car_id);

        const cars = await Car.findAll({
            where: {
                id: {
                    [Op.in]: car_ids
                }
            }
        });

        Object.assign(user, { cars });
        // eslint-disable-next-line no-unused-vars
        const { password, ...normalizedUser } = user;
        user = normalizedUser;

        res.json(user);
    }
};
