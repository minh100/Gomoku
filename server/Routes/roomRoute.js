// server communication
const express = require('express');

const {getRooms} = require('../Controller/roomControls.js');

const router = express.Router();

router.get('/', getRooms)   // get all rooms

module.exports = router;
