const { authService } = require('../services');
const tokenizer = require('../helpers/tokenizer');

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
};
