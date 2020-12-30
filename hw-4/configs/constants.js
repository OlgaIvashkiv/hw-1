module.exports = {
    ACCESS_TOKEN_EXPIRE_TIME: '30m',
    REFRESH_TOKEN_EXPIRE_TIME: '30d',

    CHECK_REFRESH_TOKEN_TIME: (24 * 60 * 60 * 1000 * 30),

    CRONE_TIME: '0 0 * * *',

    AUTHORIZATION: 'Authorization',
    MIN_CAR_YEAR: 1980,

    PHOTO_MAX_SIZE: 2 * 1024 * 1024, // 2MB
    FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB

    FILE_MAX_Q_TY: 10,
    PHOTO_MAX_Q_TY: 10,

    TYPE_PHOTO: 'photo',
    TYPE_DOC: 'document',

    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp'
    ],
    DOCS_MIMETYPES: [
        'application/msword', // DOC
        'application/pdf', // PDF
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLS
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOC 2007
    ]
};
