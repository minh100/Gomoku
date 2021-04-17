const mongoose = require('mongoose');

// model for what a room contains 
const roomSchema = mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    playerArray: [],
});

const roomModel = mongoose.model('RoomModel', roomSchema);

module.exports = roomModel;