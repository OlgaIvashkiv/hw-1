const LogsModel = require('../dataBase/mongo-models/Logs');

module.exports = {
    createLogs: (data) => {
        new LogsModel(data).save();
    }
};
