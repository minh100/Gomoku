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
    } catch(error) {
        res.status(400).json({message: error});
    }
};

// delete a room from database
const deleteRoom = async (req, res) => {
    const {id} = req.params;
    console.log(req);
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No room with that id");
    }

    await RoomModel.findByIdAndDelete(id);
    
    res.json({message: 'Room has been successfully deleted'});
}

// updates room by adding player
const addPlayerToRoom = async(req, res) => {
    console.log(req);
}

// updates room by removing
const removePlayerFromRoom = async(req, res) => {

}

module.exports = { getRooms, createRoom, deleteRoom, addPlayerToRoom };