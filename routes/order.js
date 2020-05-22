const express = require('express');
const router = express.Router();
const passport = require('passport');


const {authorizing} = require('../helper/roleAccount');
const {errorHandler} = require('../helper/dbErrorHandler');

const Order = require('../models/order');

router.get('/get/:orderId', passport.authenticate('jwt', {session: false}), (req, res) => {
    Order.find({userId: req.params.id})
        .then((data, err) => {
            if (!data) {
                return res.status(404).json({error: errorHandler(err)});
            } else {
                return res.status(200).json({data});
            }
        })
});

router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {
    Order.findOne({user: req.params.user})
        .then(order => {
            if (!order) return res.status(400).json({error: "department exists"});
            const newOrder = new Order({
                user: req.user.id,
                ...req.body
            });
            newOrder.save()
                .then(orders => res.status(200).json({'data': orders}))
                .catch(err => res.status(500).json({error: errorHandler(err)}))
        })
        .catch(err => {
            return res.status(500).json({error: errorHandler(err)})
        })
});

router.post('/edit/:orderId', passport.authenticate('jwt', {session: false}), (req, res) => {

});

router.delete('/delete/:orderId', passport.authenticate('jwt', {session: false}), (req, res) => {

});

module.exports = router;
