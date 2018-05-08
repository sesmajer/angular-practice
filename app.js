const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users')
const config = require('./config/database');



mongoose.connect(config.database);
//Database connected
mongoose.connection.on('connected', () => {
    console.log('Connected to the database ', config.database);
});
//Database Error
mongoose.connection.on('error', (err) => {
    console.log('Database Error ', err);
});

const app = express();

const port = 3000;

//Server Port
app.listen(port, () => {
    console.log('Server is listening on port ', port);
});


//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});


//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use('/users', users)