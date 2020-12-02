const express = require('express');
const path = require('path');
const fs = require('fs');
const exprsHbs = require('express-handlebars');

const usersArrayPath = path.join(process.cwd(), 'users-list.js');

const app = express();

// view engine setup
app.set('view engine', '.hbs');
app.set('views', path.join(process.cwd(), 'views'));
app.engine('.hbs', exprsHbs({ defaultLayout: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

//flags
let isLogged = false;
let errorMessage = 'Please try again.';

app.get('/', (req, res) => {
    res.render('main');
});
app.get('/registration', (req, res) => {
    res.render('registration');
});

app.post('/registration', ((req, res) => {
        const { name, surname, password, email } = req.body;

        fs.readFile(usersArrayPath, ((err, data) => {

                if (err) {
                    errorMessage = 'Could not read DB file. Please сheck the code.';
                    res.render('error');
                    return
                }

                const users = JSON.parse(data.toString());
                const findUser = users.find((user) => user.email === email);

                if (!findUser) {
                    users.push(req.body);
                    fs.writeFile(usersArrayPath, JSON.stringify(users), (err1) => {

                        if (err1) {
                            errorMessage = 'Could not write DB file. Please сheck the code.';
                            res.render('error');
                        }
                    });

                    isLogged = true;
                    res.redirect('/users');
                    return;
                }

                errorMessage = 'This user is already registered. Please Login.';
                res.redirect('/error');
            }
        ));
    }
));

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', ((req, res) => {
    const { email, password } = req.body;

    fs.readFile(usersArrayPath, (err, data) => {

        if (err) {
            errorMessage = 'Could not read DB file. Please сheck the code.';
            res.render('error');
            return
        }

        const users = JSON.parse(data.toString());
        const user = users.find(el => el.email === email && el.password === password);

        if (!user) {
            errorMessage = 'Password or email is incorrect. \n Please try again or register';
            res.redirect('/error');
            return
        }

        isLogged = true;
        res.redirect('/users');

    })

}))

app.get('/users', (req, res) => {

    if (!isLogged) {
        errorMessage = 'Please login';
        res.redirect('/error');
    }

    fs.readFile(usersArrayPath, (err, data) => {

        if (err) {
            errorMessage = 'Could not read DB file. Please сheck the code.';
            res.render('error');
            return
        }

        const users = JSON.parse(data.toString());
        res.render('users', { users })
    })
})

app.get('/error', (req, res) => {
    res.render('error', { message: errorMessage });
})

app.listen(5000, () => console.log('Server is UP'));

module.exports = app;
