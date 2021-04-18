import React, { createContext, useReducer } from 'react'
import RoomReducer from './RoomReducer.js';

import { fetchAllRooms, createRoom } from '../../Api/ServerRoomIndex.js';

export const GlobalRoomContext = createContext([]);

export const GlobalRoomProvider = props => {
    const [roomState, dispatch] = useReducer(RoomReducer, []);

    // room actions
    // get all rooms in database
    const getAllRooms = async () => {
        try {
            const { data } = await fetchAllRooms();
            dispatch({ type: 'FETCH_ALL_ROOMS', payload: data });
        } catch (error) {
            console.log(error);
        }
    };

    // creating new room
    const createNewRoom = async (newRoom) => {
        try {
            const { data } = await createRoom(newRoom);
            dispatch({ type: 'CREATE_ROOM', payload: data });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <GlobalRoomContext.Provider
            value={{
                rooms: roomState,
                getAllRooms,
                createNewRoom
            }}
        >
            {props.children}
        </GlobalRoomContext.Provider>
    )
}