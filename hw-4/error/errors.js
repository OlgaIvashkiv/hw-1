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
    USER_ALREADY_IN_DB: {
        message: 'User is already registered',
        code: FORBIDDEN
    },
    USER_NOT_REGISTERED: {
        message: 'User is not registered',
        code: FORBIDDEN
    },
    CAR_NOT_REGISTERED: {
        message: 'Car is not registered',
        code: FORBIDDEN
    },
    USER_IS_UPDATED: {
        message: 'User is updated successfully',
        code: CREATED
    },
    CAR_IS_UPDATED: {
        message: 'Car is updated successfully',
        code: CREATED
    },
    USER_IS_DELETED: {
        message: 'User is deleted',
        code: NO_CONTENT
    },
    CAR_IS_DELETED: {
        message: 'Car is deleted',
        code: NO_CONTENT
    },
    WRONG_EMAIL_OR_PASS: {
        message: 'Email or password is incorrect',
        code: BAD_REQUEST
    },
    NOT_VALID_TOKEN: {
        message: 'Not valid token',
        code: UNAUTHORIZED
    },
    PERMISSION_DENIED: {
        message: 'Permission denied',
        code: FORBIDDEN
    }

};
