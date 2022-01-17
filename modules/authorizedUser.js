const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    PhoneNo: {
        type: String,
        required: true,
        index: {
            unique: true,
        }
    },
    Name: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true
    },
});

const usermodel = mongoose.model('mkm', userSchema);

module.exports = usermodel;
