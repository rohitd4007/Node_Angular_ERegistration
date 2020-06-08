const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    email: {
        type: String,
    },
    regType: {
        type: String,
    },
    photo: {
        type: String,
        default: 'http://localhost:3000/default.png',
    },
    noOfTicket: {
        type: Number,
    },
    registrationDate: {
        type: Date,
        default: Date.now(),
    },
    userId: {
        type: Number,
    },
});
const User = mongoose.model('user', userSchema);

module.exports = User;