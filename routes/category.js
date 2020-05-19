const express = require('express');
const router = express.Router();
const passport = require('passport');
const {authorizing} = require('../helper/roleAccount');
const {errorHandler} = require('../helper/dbErrorHandler');

const Category = require('../models/category');

router.get('/:categoryId', (req, res) => {
    return res.json(req.category)
});

router.post('/create', passport.authenticate('jwt', {session: false}), authorizing(1), (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({data});
    });
});


module.exports = router;
