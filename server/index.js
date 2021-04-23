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

const { getRooms, createRoom, addPlayerToRoom } = require('./socketServer.js');

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
        getRooms().then(res => {
            console.log('Game Created');
            console.log(res);
            createRoom(roomData).then(room => {
                console.log('Room made');
                res.push(room);
                console.log(res);
                io.sockets.emit('lobby', res);
            })
        });
    })

    // when a player joins a room, the room gets updated, and the updated room is sent back
    // to all other sockets
    // on from client/RoomForm.js and emits to client/Lobby.js
    socket.on('updateRoom', (gameToJoin) => {
        console.log("GAME TO JOIN");
        console.log(gameToJoin);
        addPlayerToRoom(gameToJoin).then(updatedRoom => {
            getRooms().then(rooms => {
                let newRooms = rooms.filter(room => room._id !== updatedRoom._id);
                newRooms.push(updatedRoom);
                io.sockets.emit('lobby', newRooms);
            })
        })
    })

    socket.on('disconnect', () => {
        console.log(`socket has disconnected: ${socket.id}`)
    })

});

// connect to database and server
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => server.listen(PORT, () => console.log(`Listening on port: ${PORT}`)))
    .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);

