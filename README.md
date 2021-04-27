# Gomoku Online

## View the site
https://minh100.github.io/Gomoku/

## About
MERN site that allows users to signup/login and play Gomoku online. Find, create, and play against others for rating. Rating is displayed on a leaderboard so you can see just how your skills rank amongst others.

## Tech Stack
- MERN
    - MongoDB Atlas as database
    - Express and NodeJS as backend
    - React as fronend
    - SocketIO as real-time communcation

## Features

- Accounts
    - Create and store profile and ratings in a database
        - Avatars created from [DiceBear Avatars API](https://avatars.dicebear.com/)
        - Username checking to see if taken or not
    - Login from anywhere to play
    - Signout to stay secure
    - Browse as guest (but won't be able to play)
- Game and Room
    - Join an available game
        - If no games are available then a new game will be created
    - Create custome game
        - Make your own game and invite or wait for others to join
        - Error checking to see if a roomname is taken
        - Password option to make a room private
    - Game's roomname created from [Random Word Api](https://random-word-api.herokuapp.com) so that no roomnames are the same
    - Display list of rooms
        - roomname, playercount, password required, and actions
        - Actions include:
            - If a room is not filled, then a **Join** button is shown
            - If a room is filled, then a **In session** button is shown
        - Filtering of rooms to allow for easy search
    - After a game is made or finished, the rooms are updated for real time viewing
- Leaderboard
    - Display list of users
    - username, avatar, rating
    - Filtering of users to allow for easy search
- Local Play
- Leaving a game while unfinished will cause the leave to be punished and the remaining player to be notified of their leave
- [React Error Boundary](https://github.com/bvaughn/react-error-boundary#readme)

## Developer Features

- Frontend
    - React
        - React Router Dom for navigation
        - useContext, useReducer for state management
    - Axios 
        - Retrieve information from server and API's
    - TailWindCss
        - UI, aesthetics, responsive design
    - Error handling
        - [React Error Boundary](https://github.com/bvaughn/react-error-boundary#readme)
    - [Random Word Api](https://random-word-api.herokuapp.com)
    - [DiceBear Avatars API](https://avatars.dicebear.com/)
<br/>
- Backend
    - Express
    - bycryptjs
        - Securely hash a user's password for security
    - nodemon
        - Autoreload when changes to server
    - dotenv
        - Hides secrets
    - cors
        - Avoid cors errors
    - Body-parser
        - Correctly parse JSON for information retrieval and usage
<br/>
- Database
    - MongoDB Atlas
        - Mongoose for Object Data Modeling of MongoDB
<br/>
- SocketIO
    - Real-time communication between clients <-> clients and clients <-> server

## Installation

Get the source code:

```shell
git clone https://github.com/minh100/Gomoku.git
cd Gomoku
```

Install all dependecies at the root of the repo:

```shell
npm install
```

## Deployment and Updating

### Updating Work

At the root of the repo push to Git:
```shell
cd Gomoku
git add .
git commit
git push origin master
```

- To update server do **_step 4_** of **_Deploying to Server-side_**<br/>
- To update client do **_Deploying to Client-side_**


### Deploying to Client-side
Navigate to client subfolder and npm run deploy:
```shell
cd client
npm run deploy
```
- [Github Pages Reference (Follow This Guide)](https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f)<br/>

### Deploying to Server-side

- Since we are using Heroku to deploy the backend server, we need to take into consideration of the subfolders we want to deploy
    - In this case we only want to deploy the **server** folder
        1. Create a Heroku app
        2. Navigate to root of repo
        3. Create the heroku remote using the command
            ```
            heroku git:remote -a <heroku_url>
        4. Now still at the root of the repo, run
            ```
            git subtree push --prefix <pathToSubfolder> heroku master
            ```
            As an examaple we only want to deploy the server folder
            ```
            git subtree push --prefix server heroku master
            ```
- [Heroku Reference](https://jtway.co/deploying-subdirectory-projects-to-heroku-f31ed65f3f2)<br/>

