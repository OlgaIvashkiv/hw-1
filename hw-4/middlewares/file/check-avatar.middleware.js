const { errors, ErrorHandler } = require('../../error');
const { PHOTO_MAX_SIZE, PHOTOS_MIMETYPES } = require('../../configs/constants');

module.exports = (req, res, next) => {
    try {
        const { files } = req;

        if (files) {
            const photos = [];

            const allFiles = Object.values(files);

            for (let i = 0; i < allFiles.length; i++) {
                const { mimetype, size } = allFiles[i];

                if (PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (size > PHOTO_MAX_SIZE) {
                        throw new ErrorHandler(errors.TOO_BIG_FILE_SIZE.message, errors.TOO_BIG_FILE_SIZE.code);
                    }

                    photos.push(allFiles[i]);
                } else {
                    throw new ErrorHandler(errors.WRONG_FILE_EXTENSION.message, errors.WRONG_FILE_EXTENSION.code);
                }
            }
            if (photos.length > 1) {
                throw new ErrorHandler(errors.JUST_ONE_PHOTO.message, errors.JUST_ONE_PHOTO.code);
            }

            [req.avatar] = photos;
            next();
        }

        next();
    } catch (e) {
        next(e);
    }
};
