const path = require('path');
const fs = require('fs-extra').promises;
const { Op } = require('sequelize');
const uuid = require('uuid').v1();

const { userService } = require('../services');
const { OK, NO_CONTENT, CREATED } = require('../configs/error-codes');
const { errors: { USER_IS_UPDATED, USER_IS_DELETED } } = require('../error');
const { hash } = require('../helpers/password.helper');

const db = require('../dataBase').getInstance();

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const {
                avatar,
                body: { password }
            } = req;
            const hashedPassword = await hash(password);

            const createdUser = await userService.addUserToDB({ ...req.body, password: hashedPassword });

            if (avatar) {
                const pathWithoutPublic = path.join('user', `${createdUser.id}`, 'photos');
                const photoDir = path.join(process.cwd(), 'public', pathWithoutPublic);
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;
                const finalPhotoPath = path.join(pathWithoutPublic, photoName);

                await fs.mkdir(photoDir, { recursive: true });
                await avatar.mv(path.join(photoDir, photoName));

                await userService.updateUserById(createdUser.id, { avatar: finalPhotoPath });
            }
            // await emailService.sendMail(email, WELCOME, { userName: name });

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
            const { id } = req.params;

            await userService.deleteUserById(id);

            const userDir = path.join(process.cwd(), 'public', 'user', `${id}`);

            fs.rmdir(userDir, { recursive: true }, (err) => { if (err) console.log(err); });

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
                avatar, params
            } = req;

            if (avatar) {
                const pathWithoutPublic = path.join('user', `${params.id}`, 'photos');
                const photoDir = path.join(process.cwd(), 'public', pathWithoutPublic);
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;
                const finalPhotoPath = path.join(pathWithoutPublic, photoName);

                await fs.rmdir(path.join(pathWithoutPublic), { recursive: true }, (err) => { if (err) console.log(err); });
                await fs.mkdir(path.join(photoDir), { recursive: true }, (err) => { if (err) console.log(err); });
                await avatar.mv(path.join(photoDir, photoName));

                req.user.avatar = finalPhotoPath;


                await userService.updateUserById(params.id, req.user);
            }

            res.status(CREATED).json(USER_IS_UPDATED.message);
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
