require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/sequelize');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const passportLocal = require('./middleware/passportLocalStrategy');
const flash = require('connect-flash');
const customFlash = require('./middleware/flash');

// converting requests into json format 
app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

// set path for static files
app.use(express.static('./assets'));

// use expressLayouts
app.use(expressLayouts);

// extract styles and scripts from partials and place it in layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set view engine 
app.set('view engine', 'ejs');
app.set('views', './views');

const sessionStore = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

app.use(session({
    name: 'bookstore',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 60 * 24)
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customFlash.setFlash);

// set path for routes
app.use('/', require('./routes'));

// syncing schema and starting server 
sequelize.sync({
        // alter: true
    })
    .then(() => {
        return console.log("Successfully connected to database");
    })
    .then(() => {
        return app.listen(port, () => {
            console.log(`Ecommerce app listening at http://${host}:${port}`);
        });
    })
    .catch(err => console.log(err));