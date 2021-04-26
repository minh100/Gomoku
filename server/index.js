const app = require('express')();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// hides connection url from public
const dotenv = require('dotenv');
dotenv.config();

// avoid cors error
app.use(cors());

// makes mongoDB work by allowing json files to be parsed correctly
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Routing
const roomRoutes = require('./Routes/roomRoute.js');
app.use('/rooms', roomRoutes);

const userRoutes = require('./Routes/userRoute.js');
app.use('/users', userRoutes)

// PORT
const PORT = process.env.PORT || 4001;

// Display to server
app.get('/', (req,res) => {
    res.send("Gomoku Backend Server")
})

/**Possibly needs Refractoring */
// --- Socket Io --- //
const socketio = require('socket.io');
const server = require('http').createServer(app);

const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const { getRooms, createRoom, addPlayerToRoom, updateGame, updateWinner, updateLoser, getAllUsers, deleteRoom } = require('./socketServer.js');

// socketio functions and connection calls
io.on('connection', (socket) => {
    console.log(`socket connection: ${socket.id}`);

    // gets all rooms and emits to client/Lobby.js
    socket.on('joinLobby', () => {
        getRooms().then(res => {
            socket.emit('lobby', res);
        });
    })

    // when a new room is created, send to all other sockets to update their lobby
    // on from client/RoomForm.js and emits to client/Lobby.js
    socket.on('gameCreated', (roomData) => {

        socket.join(roomData.roomName);

        getRooms().then(res => {
            console.log('Game Created', res);
            createRoom(roomData).then(room => {
                res.push(room);
                io.sockets.emit('lobby', res);
            })
        });
    })

    // when a player joins a room, the room gets updated, and the updated room is sent back
    // to all other sockets
    // on from client/RoomForm.js and IndividualRoom.js and emits to client/Lobby.js
    socket.on('updateRoom', ({gameToJoin, gameObject}) => {
        socket.join(gameToJoin.roomName);

        addPlayerToRoom(gameToJoin, gameObject).then(updatedRoom => {

            getRooms().then(rooms => {
                let newRooms = rooms.filter(room => room.roomName !== updatedRoom.roomName);
                newRooms.push(updatedRoom);
                io.sockets.emit('lobby', newRooms);
            })

            console.log('updatedPlayerArray',updatedRoom.playerArray);
            io.in(gameToJoin.roomName).emit('toGameRoom', updatedRoom);
        })
    });

    // when a player clicks on a tile, the game updates
    // to all other sockets in room
    // on from client/GameBoard.js and emits to client/GameBoard.js
    socket.on('updateGame', ({gameModel, currentRoom}) => {
        updateGame(gameModel, currentRoom).then(res => {
            io.in(currentRoom.roomName).emit('sendUpdatedGame', res);
        })
    });

    // at end of a game update the respective winner and loser ratings
    // then emit to update leaderboard
    // on from client/GameBoard.js and emits to client/Leaderboard.js
    socket.on('updateWinAndLose', ({gameModel, currentRoom}) => {
        updateWinner(gameModel, currentRoom).then(res => {
            updateLoser(gameModel, currentRoom).then(res => {
                getAllUsers().then(allUsers => {
                    io.sockets.emit('updateLeaderboard', allUsers);
                })
            })
        })
    });

    // delete a room after a game has ended
    // on from client/GameBoard.js and emits to client/Lobby.js
    socket.on('deleteGameRoom', ({currentRoom}) => {
        socket.leave(currentRoom.roomname);
        deleteRoom(currentRoom);
        getRooms().then(res => {
            io.sockets.emit('lobby', res);
        });
    }); 

    socket.on('disconnect', () => {
        console.log(`socket has disconnected: ${socket.id}`)
    })
});

// connect to database and server
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => server.listen(PORT, () => console.log(`Listening on port: ${PORT}`)))
    .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);

