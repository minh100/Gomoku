import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom';

import { GameBoard } from './GameBoard.js';
import { GlobalRoomContext } from '../../Global/GlobalRoom/GlobalRoomState.js';

export const GameRoom = () => {

    const location = useLocation();
    const history = useHistory();
    const { rooms, getAllRooms } = useContext(GlobalRoomContext);
    const currentRoom = rooms.find(room => room.roomName === location.state[0]);
    const [rerender, setRerender] = useState(false);

    const userAccount = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        // used to avoid upon refreshing losing rooms data
        const getInit = async () => {
            await getAllRooms();
        };

        getInit();

        setTimeout(async () => {
            setRerender(!rerender);
            await checkIfValidUser();
        }, 1600);

    }, [])

    // check if current player by local storage is in current room
    // if not then redirect
    const checkIfValidUser = () => {
        if (!location.state[1].some(username => [userAccount[0]?.userResult?.username, userAccount[0]?.result?.username].includes(username))) {
            console.log("going back")
            history.goBack();
        }
    }
    console.log(location);

    return (
        <div>
            Game Room
            {
                currentRoom && currentRoom.playerArray.length >= 2 ? (
                    <GameBoard />
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
