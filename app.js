require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/sequelize');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');

// converting requests into standard datatypes 
app.use(express.urlencoded({
    extended: true
}));

// set path for static files
app.use(express.static('./assets'));

// use expressLayouts
app.use(expressLayouts);

// set path for routes
app.use('/', require('./routes/home'));

// extract styles and scripts from partials and place it in layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set view engine 
app.set('view engine', 'ejs');
app.set('views', './views');

// syncing schema and starting server 
sequelize.sync()
    .then(() => {
        return console.log("Successfully connected to database");
    })
    .then(() => {
        return app.listen(port, () => {
          console.log(`Ecommerce app listening at http://${host}:${port}`);
        });
    })
    .catch(err => console.log(err));