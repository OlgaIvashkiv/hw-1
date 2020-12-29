// const { Op } = require('sequelize');
const db = require('../dataBase').getInstance();

module.exports = {
    findUserByEmail: (email) => {
        const UserModel = db.getModel('User');
        return UserModel.findAll({
            where: {
                email
            }
        });
    },
    createTokenPair: (tokenPair) => {
        const OAuthModel = db.getModel('O_Auth');

        return OAuthModel.create(tokenPair);
    },
    getTokenWithUserByParams: (findObject) => {
        const OAuthModel = db.getModel('O_Auth');
        const UserModel = db.getModel('User');

        return UserModel.findOne({
            include: {
                model: OAuthModel,
                where: findObject
            }
        });
    },
    deleteToken: (accessToken) => {
        const OAuthModel = db.getModel('O_Auth');

        return OAuthModel.destroy({
            where: { access_token: accessToken }
        });
    },
    getUserIdWithToken: (accessToken) => {
        const OAuthModel = db.getModel('O_Auth');

        return OAuthModel.findOne({
            where: { access_token: accessToken }
        });
    },
    deleteTokenById: (id) => {
        const OAuthModel = db.getModel('O_Auth');

        return OAuthModel.destroy({
            where: { id }
        });
    },
    removeExpiredRefreshTokens: (tokens) => {
        const OAuthModel = db.getModel('O_Auth');

        // return OAuthModel.destroy({
        //     where: {
        //         created_at: {
        //             [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 30)
        //         }
        //     }
        // });
        return OAuthModel.destroy({
            where: {
                tokens
            }
        });
    }
};
