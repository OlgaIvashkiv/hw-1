const { ErrorHandler, errors: { WRONG_EMAIL_OR_PASS } } = require('../../error');
const { authService } = require('../../services');
const { compare } = require('../../helpers/password.helper');

module.exports = {
    findUserByEmail: async (req, res, next) => {
        try {
            const { email } = req.body;
            const findUser = await authService.findUserByEmail(email);

            if (!findUser.length) throw new ErrorHandler(WRONG_EMAIL_OR_PASS.message, WRONG_EMAIL_OR_PASS.code);

            req.user = findUser;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkPasswordValidity: async (req, res, next) => {
        try {
            const { password } = req.body;
            const [{ password: userPass }] = req.user;

            await compare(password, userPass);

            next();
        } catch (e) {
            next(e);
        }
    },
};
