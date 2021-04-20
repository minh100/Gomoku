// server 'rooms' communication
const express = require('express');

const {getRooms, createRoom, deleteRoom, addPlayerToRoom} = require('../Controller/roomControls.js');

const router = express.Router();

router.get('/', getRooms);              // get all rooms
router.post('/', createRoom)            // create new room
router.delete('/:id', deleteRoom);      // delete room
router.patch('/:id', addPlayerToRoom);  // adds player to room

module.exports = router;
