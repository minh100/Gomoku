const mongoose = require('mongoose');
const RoomModel = require('./Models/roomModel.js');

const getRooms = async() => {
    try {
        const rooms = await RoomModel.find({});
        return rooms;
    } catch (error) {
        console.log("Error in getting rooms");
    }
}

// create a new room in database
const createRoom = async (roomData) => {
    const newRoom = new RoomModel(roomData);
    try {
        console.log(newRoom);
        return newRoom;
    } catch(error) {
        res.status(400).json({message: error});
    }
};

const addPlayerToRoom = async(gameToJoin) => {
    const {_id, playerArray: updatedPlayerArray} = gameToJoin;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).sned("No game room with that id");
    }

    const updatedRoom = await RoomModel.findByIdAndUpdate(_id, {playerArray: updatedPlayerArray}, {new: true});
    return updatedRoom;
}


module.exports = {getRooms, createRoom, addPlayerToRoom};