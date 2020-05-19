const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    about: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        default: 'user'
    },
    history: {
        type: Array,
        default: []
    }
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);
