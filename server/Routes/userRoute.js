// server 'users' communication
const express = require('express');

const {login, createUser, getUsers} = require('../Controller/userControls.js');

const router = express.Router();

router.get('/', getUsers);              // gets all users
router.post('/login', login);           // logs a user in
router.post('/signup', createUser);     // create a new user

module.exports = router;