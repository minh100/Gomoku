// connection between the server and the database
// methods and functions to handle users
const bcrypt = require('bcryptjs');  // encrypt password
const jwt = require('jsonwebtoken'); // keeps user logged in

const UserModel = require('../Models/userModel.js');

// retrieve all users in database
const getUsers = async(req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message: error});
    }
};

// Checks database for existing user and logs them in
const login = async (req, res) => {
    const {username, password} = req.body;
    const lowerUsername = username.toLowerCase();
    try {
        // check if there is an account made
        const existingUser = await UserModel.findOne({lowerUsername: lowerUsername});
        if(!existingUser) return res.status(404).json({message: "User doesn't exists."});

        // check if password provided is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid Credentials."});
    
        // tests is a secret key. HAVE TO PUT INTO .ENV
        const token = jwt.sign({username: existingUser.username}, 'test');
        
        res.status(200).json({result: existingUser, token});
    } catch(error) {
        res.status(500).json({message: "something went wrong when logging in"});
    }
};

// Sign up and create new user
const createUser = async (req, res) => {
    const {username, lowerUsername, password, avatar} = req.body;
    
    try {
        // check if there is an account already exists
        const existingUser = await UserModel.findOne({lowerUsername});
        if(existingUser) return res.status(400).json({message: "User already exists"});

        // create hash password
        const hashPassword = await bcrypt.hash(password, 12);

        const userResult = await UserModel.create({
            username,
            lowerUsername,
            password: hashPassword,
            avatar: avatar
        });

        // tests is a secret key. HAVE TO PUT INTO .ENV
        const token = jwt.sign({username: userResult.username}, 'test');

        res.status(200).json({userResult, token});
    } catch(error) {
        res.status(500).json({message: error});
    }
};

module.exports = {login, createUser, getUsers};