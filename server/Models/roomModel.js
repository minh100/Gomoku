const mongoose = require('mongoose');

// model for what a room contains  
const roomSchema = mongoose.Schema({
    roomName: {
        type: String,
        required: true,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    playerArray: {
        type: [String],
        required: true,
        default: []
    },
});

const roomModel = mongoose.model('RoomModel', roomSchema);

module.exports = roomModel;