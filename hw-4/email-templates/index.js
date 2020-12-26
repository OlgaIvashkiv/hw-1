const mailAction = require('../configs/email-actions.enum');

module.exports = {
    [mailAction.WELCOME]: {
        subject: 'Thank you for registration',
        templateName: 'welcome'
    },
    [mailAction.USER_BLOCKED]: {
        subject: 'Your account is blocked',
        templateName: 'user-blocked'
    }
};
