import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import Game from '../../Engine/Game.js';

import { GameBoard } from './GameBoard.js';
import { GlobalRoomContext } from '../../Global/GlobalRoom/GlobalRoomState.js';
import {SocketContext} from '../../Global/GlobalSocket/Socket.js';

export const GameRoom = () => {

    const location = useLocation();
    const history = useHistory();
    const { rooms, getAllRooms } = useContext(GlobalRoomContext);
    const currentRoom = rooms.find(room => room.roomName === location.state[0]);
    // const [currentRoom, setCurrentRoom] = useState(() => {
    //     return rooms.find(room => room.roomName === location.state[0])
    // });
    const [rerender, setRerender] = useState(false);
    const socket = useContext(SocketContext);

    const userAccount = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        // used to avoid upon refreshing losing rooms data
        const getInit = async () => {
            await getAllRooms();
        };

        getInit();

        setTimeout( () => {
            checkIfValidUser();
        }, 1600);

        
    }, [rerender]);

    useEffect(() => {
        
    }, [socket])

    // check if current player by local storage is in current room
    // if not then redirect
    const checkIfValidUser = () => {
        if (!location.state[1].some(username => [userAccount[0]?.userResult?.username, userAccount[0]?.result?.username].includes(username))) {
            console.log("going back")
            history.goBack();
        }
    }
    console.log(location);
    console.log(currentRoom);

    return (
        <div>
            Game Room
            {
                currentRoom !== undefined && currentRoom.playerArray.length >= 2 ? (
                    <GameBoard game={new Game(15, currentRoom.playerArray)}/>
                ) : (
                    <h1>Waiting for others to join...</h1>
                )
            }
            <div>
                Players in room: {currentRoom && currentRoom.roomName}
                {
                    currentRoom && currentRoom.playerArray.map(player => {
                        return <h1 key={player}>{player}</h1>
                    })
                }
            </div>
        </div>
    )
};
