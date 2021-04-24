const mongoose = require('mongoose');
const RoomModel = require('./Models/roomModel.js');

const getRooms = async () => {
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
        console.log('newRoom at socketServer',newRoom);
        return newRoom;
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

const addPlayerToRoom = async (gameToJoin, gameObject) => {
    const { playerArray: updatedPlayerArray } = gameToJoin;

    console.log('updatedPlayerArray', updatedPlayerArray);

    if (!mongoose.Types.ObjectId.isValid(gameToJoin._id)) {
        return console.log("No document by that ID")
    }

    const updatedRoom = await RoomModel.findOneAndUpdate({ roomName: gameToJoin.roomName },
        {
            playerArray: updatedPlayerArray,
            $set: {'game.playerArray': gameObject.playerArray},
            $set: { 'game.ratingWin': gameObject.ratingWin},
            $set: { 'game.ratingLose': gameObject.ratingLose}
        },
        { new: true }
    );

    return updatedRoom;
}


module.exports = { getRooms, createRoom, addPlayerToRoom };