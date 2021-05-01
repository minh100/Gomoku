import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom';

import { LeaveForm } from '../BlockingForm/LeaveForm.js';
import { GameBoard } from './GameBoard.js';
import { GlobalRoomContext } from '../../Global/GlobalRoom/GlobalRoomState.js';
import { GlobalUserContext } from '../../Global/GlobalUser/GlobalUserState.js';
import { SocketContext } from '../../Global/GlobalSocket/Socket.js';

export const GameRoom = () => {

    const location = useLocation();
    const history = useHistory();
    const { rooms, getAllRooms } = useContext(GlobalRoomContext);
    const { users } = useContext(GlobalUserContext);
    let currentRoom = rooms.find(room => room.roomName === location.state[0]);
    const [rerender, setRerender] = useState(false);
    const socket = useContext(SocketContext);

    const [howToPlay, toggleHowToPlay] = useState(false);

    const userAccount = useState(JSON.parse(localStorage.getItem('profile')));
    if (userAccount[0] !== null) {
        var profileUsername = userAccount[0].userResult !== undefined ? userAccount[0].userResult.username : userAccount[0].result.username;
    }
    var profile = users.find(user => user.username === profileUsername);

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
            currentRoom = updatedRoom;
            setRerender(!rerender);
        });

    }, [currentRoom, socket])
    // console.log('currentRoom', currentRoom)

    // check if current player by local storage is in current room
    // if not then redirect
    const checkIfValidUser = () => {
        if (location.state[1] === undefined) {
            if (!location.state[1].some(user => user._id === profile._id)) {
                history.goBack();
            }
        }
    }

    return (
        <>
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
                                                        {
                                                            `Rating: ${player.rating}`
                                                        }
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
                        <>
                            <div className="flex flex-wrap lg:mr-3">
                                <div className="w-full text-center">
                                    <button
                                        className={
                                            "bg-purple-600 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        }
                                        type="button"
                                        onClick={() => toggleHowToPlay(!howToPlay)}
                                    >
                                        How To Play
                                    </button>
                                </div>
                            </div>
                        </>
                        {
                            howToPlay && (
                                <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4 lg:mr-3">
                                    <div className="max-w-2xl sm:mx-auto lg:max-w-3xl">
                                        <section className="grid gap-8 row-gap-0 lg:grid-cols-4">
                                            <div className="relative text-center">
                                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-20 sm:h-20">
                                                    <svg
                                                        className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                                                        stroke="currentColor"
                                                        viewBox="0 0 52 52"
                                                    >
                                                        <polygon
                                                            strokeWidth="3"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            fill="none"
                                                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                                                        />
                                                    </svg>
                                                </div>
                                                <h6 className="mb-2 text-2xl font-extrabold">First Move</h6>
                                                <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto sm:w-3/5 md:w-full">
                                                    First player will have their piece automatically played at the center of the board
                                                </p>
                                                <div className="top-0 right-0 flex items-center justify-center h-24 lg:-mr-8 lg:absolute">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-9 text-gray-700 transform rotate-90 lg:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="relative text-center">
                                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-20 sm:h-20">
                                                    <svg
                                                        className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                                                        stroke="currentColor"
                                                        viewBox="0 0 52 52"
                                                    >
                                                        <polygon
                                                            strokeWidth="3"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            fill="none"
                                                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                                                        />
                                                    </svg>
                                                </div>
                                                <h6 className="mb-2 text-2xl font-extrabold">Second Move</h6>
                                                <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto sm:w-3/5 md:w-full">
                                                    Second player can put their stone anywhere on the board
                                                </p>
                                                <div className="top-0 right-0 flex items-center justify-center h-24 lg:-mr-8 lg:absolute">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-9 text-gray-700 transform rotate-90 lg:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="relative text-center">
                                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-20 sm:h-20">
                                                    <svg
                                                        className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                                                        stroke="currentColor"
                                                        viewBox="0 0 52 52"
                                                    >
                                                        <polygon
                                                            strokeWidth="3"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            fill="none"
                                                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                                                        />
                                                    </svg>
                                                </div>
                                                <h6 className="mb-2 text-2xl font-extrabold">Third Move</h6>
                                                <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto sm:w-3/5 md:w-full">
                                                    The third piece must be placed outside of the center 7x7 square
                                                </p>
                                                <div className="top-0 right-0 flex items-center justify-center h-24 lg:-mr-8 lg:absolute">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-9 text-gray-700 transform rotate-90 lg:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="relative text-center">
                                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-20 sm:h-20">
                                                    <svg
                                                        className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                                                        stroke="currentColor"
                                                        viewBox="0 0 52 52"
                                                    >
                                                        <polygon
                                                            strokeWidth="3"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            fill="none"
                                                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                                                        />
                                                    </svg>
                                                </div>
                                                <h6 className="mb-2 text-2xl font-extrabold">To Win</h6>
                                                <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto sm:w-3/5 md:w-full">
                                                    Now play the game like normal and try to make an unbroken chain of 5 of your pieces to win!
                                                </p>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        {
                            currentRoom !== undefined && currentRoom.playerArray.length >= 2 ? (
                                <GameBoard game={currentRoom.game} currentRoom={currentRoom} profile={profile} />
                            ) : (
                                <>

                                    {
                                        currentRoom !== undefined ? (
                                            <>
                                                <LeaveForm when={currentRoom.playerArray.length < 2} currentRoom={currentRoom} />
                                                <h1>Waiting for others to join...</h1>
                                            </>
                                        ) : <h1>Waiting for others to join...</h1>
                                    }
                                </>

                            )
                        }
                    </div>

                </div>
            </div>
        </>
    )
};