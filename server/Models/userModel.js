const mongoose = require('mongoose');

// model for what a user contains
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0
    }
});

const userModel = mongoose.model('UserModel', userSchema);

module.exports = userModel;