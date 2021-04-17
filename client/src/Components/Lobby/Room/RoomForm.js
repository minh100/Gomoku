import React, { useState, useContext, useEffect } from 'react'

import { GlobalRoomContext } from '../../../Global/GlobalRoom/GlobalRoomState.js';
import './RoomForm.css';

export const RoomForm = () => {

    const { createRoom } = useContext(GlobalRoomContext);

    const [roomData, setRoomData] = useState({
        roomId: '',
        password: '',
        playerArray: []
    });

    return (
        <div className="grid gap-4 row-gap-5 sm:grid-cols-2 lg:grid-cols-2">
            <div className="room-form-bottons flex flex-col justify-between p-5 border rounded-lg shadow-md">
                <div>
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h6 className="mb-2 font-semibold leading-5 text-xl">Find a Game</h6>
                    <p className="mb-3 text-sm text-gray-900">
                        Join an available game. If no games are available then a new game will be created.
                    </p>
                </div>
            </div>
            <div className="room-form-bottons flex flex-col justify-between p-5 border rounded-lg shadow-md">
                <div>
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h6 className="mb-2 font-semibold leading-5 text-xl">Create Custom Game</h6>
                    <p className="mb-3 text-sm text-gray-900">
                        Make your own game and invite or wait for others to join.
                    </p>
                </div>
            </div>
        </div>
    )
}

