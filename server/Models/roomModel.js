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
        type: [{
            username: String,
            rating: Number,
            avatar: String
        }],
        default: []
    },
    ratingWin: {
        type: Number,
        default: 0
    },
    ratingLose: {
        type: Number,
        default: 0
    },
    game: {
        size: {
            type: Number,
            default: 15
        },
        playerArray: {
            type: [{
                username: String,
                rating: Number,
                avatar: String
            }],
            default: []
        },
        board: {
            type: [Number],
            default: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
        },
        currentTurn: {
            type: Number,
            default: 0
        },
        winner: {
            type: Number,
            default: -1,
        },
        draw: {
            type: Boolean,
            default: false
        },
        win1: {
            col: {
                type: Number,
                default: 0
            },
            row: {
                type: Number,
                default: 0
            }
        },
        win2: {
            col: {
                type: Number,
                default: 0
            },
            row: {
                type: Number,
                default: 0
            }
        },
        
    }
});

const roomModel = mongoose.model('RoomModel', roomSchema);

module.exports = roomModel;