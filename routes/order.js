const express = require('express');
const router = express.Router();
const passport = require('passport');


const {authorizing} = require('../helper/roleAccount');
const {errorHandler} = require('../helper/dbErrorHandler');

const Order = require('../models/order');

router.post('/create/:orderId', passport.authenticate('jwt', {session: false}), (req, res) => {
    let history = [];
    req.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        })
    })
});

module.exports = router;
