const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateUser(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.fullName = !isEmpty(data.email) ? data.email : "";

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is valid'
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is valid';

    }
    if (!validator.isLength(data.password, {min: 6})) {
        errors.password = 'Enter fill up 6 words';
    }
    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'password2 is valid';
    }
    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'password2 is match';
    }
    if (validator.isEmpty(data.fullName)) {
        errors.fullName = 'fullName is valid';

    }
    return {
        errors,
        isValid: isEmpty(errors)
    }

};
