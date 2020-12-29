const { authService } = require('../services');

module.exports = async () => {
    console.log('START');
    await authService.removeExpiredRefreshTokens();

    console.log('FINISH');
};
