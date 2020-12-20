const express = require('express');
const path = require('path');

const { authRouter, carRouter, userRouter } = require('./routes');
const db = require('./dataBase').getInstance();

db.setModels();

const app = express();

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

app.listen(5000, () => console.log('Server is UP on localhost: 5000'));
