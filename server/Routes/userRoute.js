const express = require('express');

const {login, createUser} = require('../Controller/userControls.js');

const router = express.Router();

router.post('/login', login);
router.post('/signup', createUser);

module.exports = router;