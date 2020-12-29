const jwt = require('jsonwebtoken');

const { REFRESH_TOKEN_SECRET } = require('../configs/config');

module.exports = (token) => {
    jwt.verify(token, REFRESH_TOKEN_SECRET, (err) => {
        if (err) {
            return err;
        }

        return token;
    });
};
