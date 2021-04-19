// server 'users' communication
const express = require('express');

const {login, createUser, getUsers} = require('../Controller/userControls.js');

const router = express.Router();

router.get('/', getUsers);
router.post('/login', login);
router.post('/signup', createUser);

module.exports = router;