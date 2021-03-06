const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');


const bodyParser = require('body-parser');
const passport = require('passport');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
require('./config/passport')(passport);


mongoose.connect(config.mongodbURI, {useNewUrlParser: true})
    .then(() => console.log(" ----- MongoDB starting..."))
    .catch(err => console.log(err));

const auth = require('./routes/auth');
const category = require('./routes/category');
const product = require('./routes/product');

app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/product', product);

const port = config.port || 5000;
app.listen(port, () => {
    console.log('listening on port' + port);
});
