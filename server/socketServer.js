const mongoose = require('mongoose');
const RoomModel = require('./Models/roomModel.js');
const UserModel = require('./Models/userModel.js');

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
        return newRoom;
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

const addPlayerToRoom = async (gameToJoin, gameObject) => {
    const { playerArray: updatedPlayerArray } = gameToJoin;

    if (!mongoose.Types.ObjectId.isValid(gameToJoin._id)) {
        return console.log("No document by that ID")
    }

    const updatedRoom = await RoomModel.findOneAndUpdate({ roomName: gameToJoin.roomName },
        {
            playerArray: updatedPlayerArray,
            $set: { 'game.playerArray': gameObject.playerArray },
            $set: { 'game.ratingWin': gameObject.ratingWin },
            $set: { 'game.ratingLose': gameObject.ratingLose }
        },
        { new: true }
    );

    return updatedRoom;
}

const updateGame = async (updatedGame, currentRoom) => {
    const gameUpdated = await RoomModel.findOneAndUpdate({ roomName: currentRoom.roomName },
        {
            game: updatedGame
        },
        { new: true }
    );

    return gameUpdated;
};

const updateWinner = async (gameModel, currentRoom) => {
    const winnerUser = currentRoom.playerArray[gameModel.winner];

    try {
        const winnerProfile = await UserModel.findOne({ username: winnerUser.username });
        const ratingToWinner = winnerProfile.rating + currentRoom.ratingWin;

        const winnerUpdated = await UserModel.findOneAndUpdate({ username: winnerUser.username },
            {
                rating: ratingToWinner,
            },
            { new: true }
        );
        return winnerUpdated;

    } catch (error) {
        console.log('error occurred', error);
    }
};

const updateLoser = async (gameModel, currentRoom) => {
    const loserUser = gameModel.winner === 0 ? currentRoom.playerArray[1] : currentRoom.playerArray[0];

    try {
        const loserProfile = await UserModel.findOne({ username: loserUser.username });
        const ratingToLoser = loserProfile.rating - currentRoom.ratingLose;
        const loserUpdated = await UserModel.findOneAndUpdate({ username: loserUser.username },
            {
                rating: ratingToLoser,
            },
            { new: true }
        );

        return loserUpdated;

    } catch (error) {
        console.log('error occurred', error);
    }
};

const getAllUsers = async () => {
    try {
        const users = await UserModel.find({});
        return users;
    } catch (error) {
        console.log("Error in getting users");
    }
}

// delete a room from database
const deleteRoom = async (currentRoom) => {
    try {
        await RoomModel.findByIdAndDelete(currentRoom._id);
    } catch (error) {
        console.log(error);
    }
}

const handleLeaveGame = async (userLeft, currentRoom) => {
    console.log('leftGameprofile', userLeft);
    console.log('leftGamecurrentRoom', currentRoom);
    try {
        const loserProfile = await UserModel.findOne({ username: userLeft.username });
        const ratingToLoser = loserProfile.rating - currentRoom.ratingLose;
        const loserUpdated = await UserModel.findOneAndUpdate({ username: userLeft.username },
            {
                rating: ratingToLoser,
            },
            { new: true }
        );
        await RoomModel.findByIdAndDelete(currentRoom._id);

    } catch (error) {
        console.log(error);
    }
}

module.exports = { getRooms, createRoom, addPlayerToRoom, updateGame, updateWinner, updateLoser, getAllUsers, deleteRoom, handleLeaveGame };