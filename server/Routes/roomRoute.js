// server 'rooms' communication
const express = require('express');

const {getRooms, createRoom} = require('../Controller/roomControls.js');

const router = express.Router();

router.get('/', getRooms);      // get all rooms
router.post('/', createRoom)    // create new room

module.exports = router;
