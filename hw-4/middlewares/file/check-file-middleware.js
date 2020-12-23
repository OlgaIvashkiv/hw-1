const { errors, ErrorHandler } = require('../../error');
const {
    DOCS_MIMETYPES,
    FILE_MAX_SIZE,
    PHOTO_MAX_SIZE,
    PHOTOS_MIMETYPES
} = require('../../configs/constants');

module.exports = (req, res, next) => {
    try {
        const { files } = req;
        const docs = [];
        const photos = [];

        const allFiles = Object.values(files);

        for (let i = 0; i < allFiles.length; i++) {
            const { mimetype, size } = allFiles[i];

            if (DOCS_MIMETYPES.includes(mimetype)) {
                if (size > FILE_MAX_SIZE) {
                    throw new ErrorHandler(errors.TOO_BIG_FILE_SIZE.message, errors.TOO_BIG_FILE_SIZE.code);
                }

                docs.push(allFiles[i]);
            } else if (PHOTOS_MIMETYPES.includes(mimetype)) {
                if (size > PHOTO_MAX_SIZE) {
                    throw new ErrorHandler(errors.TOO_BIG_FILE_SIZE.message, errors.TOO_BIG_FILE_SIZE.code);
                }

                photos.push(allFiles[i]);
            } else {
                throw new ErrorHandler(errors.WRONG_FILE_EXTENSION.message, errors.WRONG_FILE_EXTENSION.code);
            }
        }

        req.photos = photos;
        req.docs = docs;

        next();
    } catch (e) {
        next(e);
    }
};
