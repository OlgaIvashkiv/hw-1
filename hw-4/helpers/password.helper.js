const bcrypt = require('bcrypt');
const { ErrorHandler, errors: { WRONG_EMAIL_OR_PASS } } = require('../error');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hash) => {
        const isPasswordEqual = await bcrypt.compare(password, hash);

        if (!isPasswordEqual) throw new ErrorHandler(WRONG_EMAIL_OR_PASS.message, WRONG_EMAIL_OR_PASS.code);
    }
};
