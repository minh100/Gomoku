const mongoose = require('mongoose');
const RoomModel = require('./Models/roomModel.js');
const UserModel = require('./Models/userModel.js');

// gets all rooms
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

// adds a player to the room and initalizes the game object
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
            $set: { 'game.ratingLose': gameObject.ratingLose },
            game: gameObject
        },
        { new: true }
    );

    return updatedRoom;
}

// handles updating the game board
const updateGame = async (updatedGame, currentRoom) => {
    const gameUpdated = await RoomModel.findOneAndUpdate({ roomName: currentRoom.roomName },
        {
            game: updatedGame
        },
        { new: true }
    );

    return gameUpdated;
};

// update the winner's rating
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

// Updates the loser's rating
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

// retreive all users from database
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

// handles when a user leaves an unfinished game
// leaver will be have the rating deducted from the account
const handleLeaveGame = async (userLeft, currentRoom) => {
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