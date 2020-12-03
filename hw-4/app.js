const express = require('express');
const path = require('path');

const { userRouter } = require('./routes');
const db = require('./dataBase').getInstance();

db.setModels();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/users', userRouter);

app.listen(5000, () => console.log('Server is UP on localhost: 5000'));
