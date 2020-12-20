const { authService } = require('../services');
const tokenizer = require('../helpers/tokenizer');
const { NO_CONTENT } = require('../configs/error-codes');
const { AUTHORIZATION } = require('../configs/constants');

module.exports = {
    login: async (req, res, next) => {
        try {
            const [{ id }] = req.user;
            const token_pair = tokenizer();

            await authService.createTokenPair({ user_id: id, ...token_pair });

            res.json(token_pair);
        } catch (e) {
            next(e);
        }
    },
    logoutUser: async (req, res, next) => {
        try {
            const accessToken = req.header(AUTHORIZATION);

            await authService.deleteToken(accessToken);

            res.send(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
};
