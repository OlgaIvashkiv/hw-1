const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

const { userRouter } = require('./routes');

app.use('/users', userRouter);

app.listen(5000, () => console.log('Server is UP'));
