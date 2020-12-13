const { OK } = require('../configs/error-codes');

module.exports = {
    getUser: (req, res) => {
        res.status(OK)
            .json('Login is successful');
    }
};
