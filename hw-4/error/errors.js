const {
    CREATED, NO_CONTENT, BAD_REQUEST, FORBIDDEN, UNAUTHORIZED
} = require('../configs/error-codes');

module.exports = {
    NOT_VALID_ID: {
        message: 'ID is not valid',
        code: BAD_REQUEST
    },
    NOT_VALID_BODY: {
        message: 'Body is not valid',
        code: BAD_REQUEST
    },
    // USER
    USER_ALREADY_IN_DB: {
        message: 'User is already registered',
        code: FORBIDDEN
    },
    USER_NOT_REGISTERED: {
        message: 'User is not registered',
        code: FORBIDDEN
    },
    USER_IS_UPDATED: {
        message: 'User is updated successfully',
        code: CREATED
    },
    USER_IS_DELETED: {
        message: 'User is deleted',
        code: NO_CONTENT
    },
    WRONG_EMAIL_OR_PASS: {
        message: 'Email or password is incorrect',
        code: BAD_REQUEST
    },
    // CAR
    CAR_NOT_REGISTERED: {
        message: 'Car is not registered',
        code: FORBIDDEN
    },
    CAR_IS_UPDATED: {
        message: 'Car is updated successfully',
        code: CREATED
    },
    CAR_IS_DELETED: {
        message: 'Car is deleted',
        code: NO_CONTENT
    },
    // TOKEN
    NOT_VALID_TOKEN: {
        message: 'Not valid token',
        code: UNAUTHORIZED
    },
    PERMISSION_DENIED: {
        message: 'Permission denied',
        code: FORBIDDEN
    },
    // FILE VALIDATION
    JUST_ONE_PHOTO: {
        message: 'You can upload just one photo as avatar',
        code: BAD_REQUEST
    },
    UP_TO_10_FILES: {
        message: 'You can upload up to 10 files only',
        code: BAD_REQUEST
    },
    TOO_BIG_FILE_SIZE: {
        message: 'File size is too big',
        code: BAD_REQUEST
    },
    WRONG_FILE_EXTENSION: {
        message: 'Wrong file extension',
        code: BAD_REQUEST
    },
};
