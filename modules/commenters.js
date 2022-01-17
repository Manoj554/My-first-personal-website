const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    PhoneNo: {
        type: String,
        required: true,
    },
    Subject: {
        type: String,
    },
    Massage: {
        type: String,
    },
});

const usermodel = mongoose.model("Manoj's Website query", userSchema);

module.exports = usermodel;
