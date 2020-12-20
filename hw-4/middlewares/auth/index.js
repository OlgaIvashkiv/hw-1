module.exports = {
    authMiddlewares: require('./auth.middleware'),
    checkAccessToken: require('./check-access-token.middleware'),
    checkRefreshToken: require('./check-refresh-token.middleware')
};
