// connection between the server and the database
// methods and functions to handle rooms
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

module.exports = { getRooms, createRoom };