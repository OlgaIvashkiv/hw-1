const cron = require('node-cron');

const removeRefreshtokens = require('./removeExpiredRefreshTokens');

module.exports = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('ITERATION START');
        await removeRefreshtokens();
        console.log('ITERATION FINISH');
    });
};
