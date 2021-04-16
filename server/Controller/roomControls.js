// connection between the server and the database
// methods and functions to communicate
const mongoose = require('mongoose');
const RoomModel = require('../Models/roomModel.js');

// retrieve all rooms in database
const getRooms = async (req, res) => {
    try {
        const rooms = await RoomModel.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(404).json({ message: error })
    }
};

module.exports = { getRooms };