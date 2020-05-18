const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {userSignupValidator} = require('../validator');

const config = require('../config/keys');

const User = require('../models/user');

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999});
        // return response with user and token to frontend client
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, email, name, role}});
    });
});

router.post('/register', userSignupValidator, async (req, res) => {
    const {name, email, password, about,} = req.body;
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                return res.json({msg: 'email does exits'})
            } else {
                const NewUser = new User({
                    name, email, password, about, salt: undefined, hashed_password: undefined
                });
                NewUser.save()
                    .then(data => {
                        return res.json({data})
                    })

            }
        })
        .catch(e => {
            console.log(e)
        })
});

module.exports = router;
