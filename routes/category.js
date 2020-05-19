const express = require('express');
const router = express.Router();
const passport = require('passport');
const {authorizing} = require('../helper/roleAccount');
const {errorHandler} = require('../helper/dbErrorHandler');

const Category = require('../models/category');
const Product = require('../models/product');

router.get('/list-category', (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
});

router.get('/detail/:categoryId', (req, res) => {
    Category.find({_id: req.params.categoryId})
        .then(category => {
            if (!category) {
                return res.status(404).json({error: 'Company information not found'});
            } else {
                res.status(200).json({'data': category});
            }
        })
        .catch(e => {
            return res.status(404).json({error: errorHandler(e)});
        })
});

router.post('/create', passport.authenticate('jwt', {session: false}), authorizing('admin'), (req, res) => {
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

router.post('/update/:categoryId', passport.authenticate('jwt', {session: false}), authorizing('admin'), (req, res) => {
    Category.findOne({_id: req.params.categoryId})
        .then(category => {
            if (!category) {
                return res.status(400).json({error: "category exists"});
            } else {
                category.name = req.body.name;
                return category.save()
                    .then(data => res.status(200).json({
                        data
                    }))
                    .catch((e) => {
                        return res.status(500).json(e)
                    })
            }
        })
        .catch(() => {
            return res.status(500).json({error: 'server not found'})
        })
});

router.delete('/delete/:categoryId', passport.authenticate('jwt', {session: false}), authorizing('admin'), (req, res) => {
    const categoryId = req.params.categoryId;
    Product.find({categoryId}).exec((err, data) => {
        if (data.length >= 1) {
            return res.status(400).json({
                message: `Sorry. You cant delete ${categoryId}. It has ${data.length} associated products.`
            });
        } else {
            Category.remove((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json({
                    message: 'Category deleted'
                });
            });
        }
    });
});


module.exports = router;
