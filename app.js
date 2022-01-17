const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5555;
var session = require('express-session');
const dotenv = require('dotenv');

//configuring env file
dotenv.config({ path: path.join(__dirname, 'config.env') });

const index = require('./apis/index');
const authority = require('./apis/authority');

// EXPRESS SPECIFIC STUFF
app.use(express.static(path.join(__dirname, 'public'))); // For serving static files
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use('/', index);
app.use('/', authority);

require('./modules/connect');

// START THE SERVER
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});