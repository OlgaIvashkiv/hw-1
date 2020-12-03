const { userService } = require('../services');

module.exports = {
    createUser: (req, res) => {
        try {
            const user = req.body;

            userService.addUserToDB(user);

            res.status(201).json(user);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getAllUsers: (req, res) => {
        try {
            const allUsers = userService.findAllUsers();

            res.status(200).json(allUsers);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUserByEmail: (req, res) => {
        try {
            const userByEmail = userService.findUserByEmail(req.params);

            res.status(200).json(userByEmail);
        } catch (e) {
            res.status(404).json(e.message);
        }
    },
    deleteUserByEmail: (req, res) => {
        try {
            const deletedUser = userService.deleteUserByEmail(req.params);

            res.status(200).json(deletedUser);
        } catch (e) {
            res.status(404).json(e.message);
        }
    }
};
