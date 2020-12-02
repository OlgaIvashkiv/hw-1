const { userService } = require('../services');

module.exports = {
    createUser: (req, res) => {
        try {
            userService.addUserToDB(req.body);

            res.status(201).json('User created');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getAllUsers: (req, res) => {
        try {
            userService.findAllUsers();

            res.status(200).json('all users');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUserByEmail: (req, res) => {
        try {
            userService.findUserByEmail(req.params);

            res.status(200).json('User found');
        } catch (e) {
            res.status(404).json(e.message);
        }
    },
    deleteUserByEmail: (req, res) => {
        try {
            userService.deleteUserByEmail(req.params);

            res.status(200).json('User deleted');
        } catch (e) {
            res.status(404).json(e.message);
        }
    }
};
