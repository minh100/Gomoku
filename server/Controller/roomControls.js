// connection between the server and the database
// methods and functions to handle rooms
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

// create a new room in database
const createRoom = async (req, res) => {
    const body = req.body;
    const newRoom = new RoomModel(body);
    try {
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// updates room by adding player
const addPlayerToRoom = async (req, res) => {
    const { id } = req.params;
    const gameObject = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No game room with that id");
    }

    // actually update database
    const updatedRoom = await RoomModel.findByIdAndUpdate(id,
        {
            playerArray: gameObject.playerArray,
            $set: { 'game.playerArray': gameObject.playerArray },
        },
        { new: true }
    );
    res.json(updatedRoom);
}

module.exports = { getRooms, createRoom, addPlayerToRoom };