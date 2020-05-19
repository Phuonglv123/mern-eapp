const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const _ = require('lodash');
const path = require('path');

const {authorizing} = require('../helper/roleAccount');
const {errorHandler} = require('../helper/dbErrorHandler');

const Product = require('../models/product');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let validateFile = function (file, cb) {
    let allowedFileTypes = /jpeg|jpg|png|JPEG|JPG|PNG/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
        return cb(null, true);
    } else {
        cb("Invalid file type. Only JPEG, PNG, JPG file are allowed.")
    }
};

let upload = multer(
    {
        storage: storage,
        limits: {fileSize: 2000000},
        fileFilter: function (req, file, callback) {
            validateFile(file, callback);
        }
    }
);

router.get('/list-category', (req, res) => {
    Product.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
});

router.get('/detail/:productId', (req, res) => {
    Product.find({_id: req.params.productId})
        .then(product => {
            if (!product) {
                return res.status(404).json({error: 'Product information not found'});
            } else {
                res.status(200).json(product);
            }
        })
        .catch(e => {
            return res.status(404).json({error: errorHandler(e)});
        })
});

router.post('/create', passport.authenticate('jwt', {session: false}), authorizing('admin'), upload.array('photo'), (req, res) => {
    const {name} = req.body;
    Product.findOne({name: name})
        .then(data => {
            if (data) return res.status(400).json({error: "department exists"});
            const newProduct = new Product({
                photo: _.map(req.files, (image) => image.path),
                ...req.body
            });
            newProduct.save()
                .then(products => res.status(200).json({products}))
                .catch(console.log)
        })
        .catch(e => {
            return res.status(500).json({error: errorHandler(e)})
        })
});

router.post('/update/:productId', passport.authenticate('jwt', {session: false}), authorizing('admin'), (req, res) => {
    Product.findOne({_id: req.params.productId})
        .then(product => {
            if (!product) {
                return res.status(400).json({error: "category exists"});
            } else {
                product.name = req.body.name;
                product.description = req.body.description;
                product.price = req.body.price;
                product.shipping = req.body.shipping;
                product.category = req.body.category;
                product.quantity = req.body.quantity;
                return product.save()
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

router.delete('/delete/:productId', passport.authenticate('jwt', {session: false}), authorizing('admin'), (req, res) => {
    Product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Product deleted successfully'
        });
    });
});


module.exports = router;
