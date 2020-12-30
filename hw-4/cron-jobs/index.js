const cron = require('node-cron');

const { CRONE_TIME } = require('../configs/constants');
const removeRefreshtokens = require('./removeExpiredRefreshTokens');

module.exports = () => {
    cron.schedule(CRONE_TIME, async () => {
        console.log('ITERATION START');
        await removeRefreshtokens();
        console.log('ITERATION FINISH');
    });
};
