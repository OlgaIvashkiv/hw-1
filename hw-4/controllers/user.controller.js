const path = require('path');
const fs = require('fs-extra').promises;
const { Op } = require('sequelize');
const uuid = require('uuid').v1();

const { emailService, logService, userService } = require('../services');
const { OK, NO_CONTENT, CREATED } = require('../configs/error-codes');
const { WELCOME, USER_BLOCKED } = require('../configs/email-actions.enum');
const { USER_REGISTERED, USER_UPDATED, USER_DELETED } = require('../configs/logs-actions.enum');
const { errors: { USER_IS_UPDATED, USER_IS_DELETED, USER_IS_CREATED } } = require('../error');
const { hash } = require('../helpers/password.helper');
const { transactionInstance } = require('../dataBase').getInstance();

const db = require('../dataBase').getInstance();

module.exports = {
    createUser: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const {
                avatar,
                body: { password, email, name }
            } = req;
            const hashedPassword = await hash(password);

            const createdUser = await userService.addUserToDB({ ...req.body, password: hashedPassword }, transaction);

            if (avatar) {
                const pathWithoutPublic = path.join('user', `${createdUser.id}`, 'photos');
                const photoDir = path.join(process.cwd(), 'public', pathWithoutPublic);
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;
                const finalPhotoPath = path.join(pathWithoutPublic, photoName);

                await fs.mkdir(photoDir, { recursive: true });
                await avatar.mv(path.join(photoDir, photoName));

                await userService.updateUserById(createdUser.id, { avatar: finalPhotoPath }, transaction);
            }
            await emailService.sendMail(email, WELCOME, { userName: name });
            await transaction.commit();

            await logService.createLogs({ user_id: createdUser.id, action: USER_REGISTERED });

            res.status(CREATED).json(USER_IS_CREATED.message);
        } catch (e) {
            await transaction.rollback();
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
            const { id } = req.params;
            const { user } = req;

            await userService.deleteUserById(id);

            const userDir = path.join(process.cwd(), 'public', 'user', `${id}`);

            fs.rmdir(userDir, { recursive: true });

            await emailService.sendMail(user.email, USER_BLOCKED, user.name);
            await logService.createLogs({ user_id: id, action: USER_DELETED });

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
            const {
                avatar, params, body: { password }
            } = req;

            req.user = { ...req.body };

            if (avatar) {
                const pathWithoutPublic = path.join('user', `${params.id}`, 'photos');
                const photoDir = path.join(process.cwd(), 'public', pathWithoutPublic);
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;
                const finalPhotoPath = path.join(pathWithoutPublic, photoName);

                await fs.readdir(photoDir, (err, files) => {
                    if (err) {
                        throw err;
                    } else {
                        files.forEach((file) => {
                            fs.unlink(photoDir, file);
                        });
                    }
                });

                await fs.mkdir(path.join(photoDir), { recursive: true });
                await avatar.mv(path.join(photoDir, photoName));

                req.user.avatar = finalPhotoPath;

                await userService.updateUserById(params.id, req.user);
            }
            if (!password) {
                await userService.updateUserById(params.id, req.user);

                return res.sendStatus(OK);
            }

            req.user.password = await hash(password);

            await userService.updateUserById(params.id, req.user);

            await logService.createLogs({ user_id: params.id, action: USER_UPDATED });

            res.status(OK).json(USER_IS_UPDATED.message);
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
