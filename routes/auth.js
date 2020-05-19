const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const validateUser = require('../validator/index');

const User = require('../models/user');

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    User.findOne({email: email})
        .then(user => {
            if (!user) {
                return res.status(404).json({errors: "email or password is wrong "})
            } else {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            const payload = {
                                id: user._id,
                                email: user.email,
                                role: user.role,
                                isActive: user.isActive,
                            };
                            jwt.sign(
                                payload,
                                config.secretKey,
                                {expiresIn: 3600},
                                (err, token) => {
                                    res.status(200).json({
                                        payload,
                                        success: true,
                                        token: 'Bearer ' + token
                                    })
                                }
                            )
                        } else {
                            return res.status(404).json({
                                'errors': {
                                    code: 400,
                                    message: null,
                                    detail: {
                                        globalErrors:
                                            "Unable to log in with provided credentials."
                                    }
                                }
                            })
                        }
                    })
            }
        })
});

router.post('/register', async (req, res) => {
    const {errors, isValid} = validateUser(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const {email, password, name, about, role} = req.body;
    User.findOne({email: email})
        .then(user => {
            if (user) {
                res.json({msg: "email is does exits"});
            } else {
                const newUser = new User({
                    email, password, name, role, about
                });
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) return console.log(err);
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) return console.log(err);
                        newUser.password = hash;
                        newUser.save()
                            .then(data => {
                                res.status(200).json({data});
                            })
                    })
                })
            }
        })
        .catch(err => console.log(err));
});

module.exports = router;
