const { userService } = require('../services');

module.exports = {
    createUser: async (req, res) => {
        try {
            const user = req.body;

            await userService.addUserToDB(user);

            res.status(201).json(user);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const allUsers = await userService.findAllUsers();

            res.status(200).json(allUsers);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
    deleteUserById: async (req, res) => {
        try {
            await userService.deleteUserById(req.params.id);

            res.status(200).json('User is deleted');
        } catch (e) {
            res.status(404).json(e.message);
        }
    },
    getUsersOfAge: async (req, res) => {
        try {
            const result = await userService.findUsersByAge(req.params.age);

            res.status(200).json(result);
        } catch (e) {
            res.status(404).json(e.message);
        }
    }
};
