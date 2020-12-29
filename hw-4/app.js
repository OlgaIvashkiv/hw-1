const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');

const { authRouter, carRouter, userRouter } = require('./routes');
const db = require('./dataBase').getInstance();
const cronRun = require('./cron-jobs');
const { MONGO_DB_URI } = require('./configs/config');

db.setModels();
// eslint-disable-next-line no-use-before-define
_connectDB();

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/cars', carRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res.status(err.code || 500)
        .json({
            message: err.message,
            ok: false
        });
});

app.listen(5000, () => {
    console.log('Server is UP on localhost: 5000');
    cronRun();
});

// eslint-disable-next-line no-underscore-dangle
function _connectDB() {
    mongoose.connect(encodeURI(MONGO_DB_URI), { useNewUrlParser: true, useUnifiedTopology: true });
    const connect = mongoose.connection;

    connect.on('error', (error) => {
        console.log(error);
    });
}
