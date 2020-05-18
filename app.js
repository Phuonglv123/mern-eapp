const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();
const app = express();

// db
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
    .then(() => console.log(" ----- MongoDB starting..."))
    .catch(err => console.log(err));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

const auth = require('./routes/auth');

app.use('/api/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('listening on port' + port);
});
