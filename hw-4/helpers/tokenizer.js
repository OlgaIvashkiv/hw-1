const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../configs/config');
const { ACCESS_TOKEN_EXPIRE_TIME, REFRESH_TOKEN_EXPIRE_TIME } = require('../configs/constants');

module.exports = () => {
    const access_token = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRE_TIME });
    const refresh_token = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRE_TIME });

    return {
        access_token,
        refresh_token
    };
};
