import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom';

import { GameBoard } from './GameBoard.js';
import { GlobalRoomContext } from '../../Global/GlobalRoom/GlobalRoomState.js';
import { GlobalUserContext } from '../../Global/GlobalUser/GlobalUserState.js';
import { SocketContext } from '../../Global/GlobalSocket/Socket.js';

export const GameRoom = () => {

    const location = useLocation();
    const history = useHistory();
    const { rooms, getAllRooms } = useContext(GlobalRoomContext);
    let currentRoom = rooms.find(room => room.roomName === location.state[0]);
    const [rerender, setRerender] = useState(false);
    const socket = useContext(SocketContext);

    const { users } = useContext(GlobalUserContext);
    const userAccount = useState(JSON.parse(localStorage.getItem('profile')));
    const profileUsername = userAccount[0].userResult !== undefined ? userAccount[0].userResult.username : userAccount[0].result.username;
    const profile = users.find(user => user.username === profileUsername);

    useEffect(() => {
        // used to avoid upon refreshing losing rooms data
        const getInit = async () => {
            await getAllRooms();
        };

        getInit();

        setTimeout(() => {
            checkIfValidUser();
        }, 1600);


    }, [rerender]);

    useEffect(() => {
        socket.on('toGameRoom', (updatedRoom) => {
            console.log('toGameRoom', updatedRoom);
            currentRoom = updatedRoom;
            setRerender(!rerender);
        });

    }, [currentRoom, socket])
    console.log('currentRoom', currentRoom)
    console.log('profile', profile);

    // check if current player by local storage is in current room
    // if not then redirect
    const checkIfValidUser = () => {
        if (!location.state[1].some(user => user._id === profile._id)) {
            console.log('not valid user, going back');
            history.goBack();
        }
    }

    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <div className="grid gap-5 row-gap-8 lg:grid-cols-2">
                <div className="flex flex-col justify-start">
                    <div className="max-w-xl mb-6">
                        <h2 className="max-w-lg mb-1 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                            <span className="relative px-1">
                                <div className="absolute inset-x-0 bottom-0 h-3 transform -skew-x-12 bg-green-400" />
                                <span className="relative inline-block text-purple-600">
                                    {currentRoom && currentRoom.roomName}
                                </span>
                            </span>
                        </h2>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-rows-2">
                        {
                            currentRoom && currentRoom.playerArray.map(player => {
                                return (
                                    <div key={player._id} className="bg-white w- border-l-4 shadow-sm border-purple-600">
                                        <div className="h-full p-5 border border-l-0 rounded-r flex">
                                            <div className="mr-3 mt-1" dangerouslySetInnerHTML={{ __html: `${player.avatar}` }} />
                                            <div>
                                                <h6 className="mb-2 font-semibold leading-5">
                                                    {`${player.username}`}
                                                </h6>
                                                <p className="text-sm text-gray-900">
                                                    {`Rating: ${player.rating}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="pl-2 text-base text-gray-700 md:text-lg">
                            {
                                currentRoom &&
                                (
                                    <>
                                        <h1>Win <span className="text-green-400">+{currentRoom.ratingWin}</span> / Lose <span className="text-red-500">-{currentRoom.ratingLose}</span></h1>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div>
                    {
                        currentRoom !== undefined && currentRoom.playerArray.length >= 2 ? (
                            <GameBoard game={currentRoom.game} currentRoom={currentRoom} profile={profile} />
                        ) : (
                            <h1>Waiting for others to join...</h1>
                        )
                    }
                </div>
            </div>
        </div>
    )
};