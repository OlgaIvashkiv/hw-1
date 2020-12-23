const { errors, ErrorHandler } = require('../../error');
const { FILE_MAX_Q_TY, PHOTO_MAX_Q_TY } = require('../../configs/constants');

module.exports = (req, res, next) => {
    try {
        if (req.photos.length > PHOTO_MAX_Q_TY) {
            throw new ErrorHandler(errors.UP_TO_10_FILES.message, errors.UP_TO_10_FILES.code);
        }

        if (req.docs.length > FILE_MAX_Q_TY) {
            throw new ErrorHandler(errors.UP_TO_10_FILES.message, errors.UP_TO_10_FILES.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
