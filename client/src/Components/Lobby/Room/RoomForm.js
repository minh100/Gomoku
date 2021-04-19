import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';

import { GlobalRoomContext } from '../../../Global/GlobalRoom/GlobalRoomState.js';

import './RoomForm.css';

export const RoomForm = () => {

    const { rooms, createNewRoom } = useContext(GlobalRoomContext);
    const [createCustomGameClicked, toggleCreateCustomGameClicked] = useState(false);
    const [isNameTaken, setNameTaken] = useState(false);

    const [roomData, setRoomData] = useState({
        roomName: '',
        password: '',
        playerArray: []
    });

    /**
     * Find a game to join, if no games then create one
     */
    const handleFindGame = () => {
        console.log("find game");
        // check if any available games
            // join game
        // if no games are available
            // randomize roomName
            // create room
    }

    /**
     * Create a custom game 
     * Checks to see if the roomName is already in use
     */
    const handleCreateGame = () => {
        console.log("create game");
        let taken = false;
        for(let i = 0; i < rooms.length; i++) {
            if(rooms[i].roomName.toLowerCase() === roomData.roomName.toLowerCase()) {
                taken = true;
                setNameTaken(true);
                break;
            }
        }
        if(!taken) {
            createNewRoom(roomData);
            toggleCreateCustomGameClicked(false)
            clearRoomData();
        }
    }
    
    /**
     * Creates a random name as the roomName
     */
    const handleRandomizeName = async () => {
        const { data } = await axios.get('https://random-word-api.herokuapp.com/word?number=2');
        setRoomData({ ...roomData, roomName: `${data[0].charAt(0).toUpperCase() + data[0].slice(1)}${data[1].charAt(0).toUpperCase() + data[1].slice(1)}` });
    }

    /**
     * Clears the data after successfully creating a game or cancelling
     */
    const clearRoomData = () => {
        setNameTaken(false);
        setRoomData({
            roomName: '',
            password: '',
        })
    }

    return (
        <>
            <div className="grid gap-4 row-gap-3 sm:grid-cols-2 lg:grid-cols-2">
                <div className="room-form-bottons flex flex-col justify-between p-5 border rounded-lg shadow-md" onClick={() => handleFindGame()}>
                    <div className="flex">
                        <div className="flex items-center justify-center w-12 h-12 mb-4 pr-3 pl-3 rounded-full bg-indigo-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <div className="pl-7 sm:pr-9 sm:pt-6 sm:pl-0">
                            <h6 className="mb-2 font-semibold leading-5 text-xl">Find a Game</h6>
                            <p className="mb-3 text-sm text-gray-900">
                                Join an available game. If no games are available then a new game will be created.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="room-form-bottons flex flex-col justify-between p-5 border rounded-lg shadow-md"
                    onClick={() => toggleCreateCustomGameClicked(true)}
                >
                    <div className="flex">
                        <div className="flex items-center justify-center w-12 h-12 mb-4 pr-3 pl-3 rounded-full bg-indigo-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <div className="pl-7 sm:pr-2 sm:pt-6 sm:pl-0">
                            <h6 className="mb-2 font-semibold leading-5 text-xl">Create Custom Game</h6>
                            <p className="mb-3 text-sm text-gray-900">
                                Make your own game and invite or wait for others to join.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {
                createCustomGameClicked && (
                    <>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Creating Custom Game
                                        </h3>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 grid grid-rows-2 gap-y-2.5">
                                        <div className="grid grid-cols-2">
                                            {isNameTaken ? (
                                                <label htmlFor="roomName" className="block text-sm font-medium text-red-700 pr-2">Room Name is taken</label>
                                            ) : (
                                                <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 pr-2">Room Name</label>
                                            )}
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                            <input type="text" name="roomName"
                                                    className="focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="room name..."
                                                    required="on"
                                                    autoComplete="off"
                                                    value={roomData.roomName}
                                                    onChange={(e) => setRoomData({ ...roomData, roomName: e.target.value })}
                                            >
                                            </input>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 pr-2" autoComplete="off">Password (optional)</label>
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <input type="text" name="password" className="focus:outline-none focus:ring-2 focus:ring-blue-600 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-md" 
                                                    placeholder="password..."
                                                    autoComplete="off"
                                                    value={roomData.password}
                                                    onChange={(e) => setRoomData({ ...roomData, password: e.target.value })}
                                                >
                                                </input>
                                            </div>
                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="grid grid-cols-2">
                                        <div className="flex items-center justify-start p-4">
                                            <button
                                                className="bg-blue-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => {
                                                    handleRandomizeName()
                                                }}
                                            >
                                                Randomize Name
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => {
                                                    handleCreateGame()
                                                }}
                                            >
                                                Create Game
                                            </button>
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none hover:shadow-lg focus:outline-none mr-1 mb-1 ease-linear transition-all"
                                                type="button"
                                                onClick={() => {
                                                    toggleCreateCustomGameClicked(false);
                                                    clearRoomData();
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

