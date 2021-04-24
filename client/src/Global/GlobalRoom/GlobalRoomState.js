import React, { createContext, useReducer } from 'react'
import RoomReducer from './RoomReducer.js';

import { fetchAllRooms, createRoom, deleteRoom, addPlayerToRoom } from '../../Api/ServerRoomIndex.js';

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
    };

    // delete room
    const deleteGameRoom = async(id) => {
        try {
            await deleteRoom(id);
            dispatch({type: 'DELETE_ROOM', payload: id});
        } catch (error) {
            console.log(error);
        }
    };

    // add player to room
    const addPlayer = async(idOfRoom, updatedPlayerArray, game) => {
        try {
            const {data} = await addPlayerToRoom(idOfRoom, updatedPlayerArray, game);
            dispatch({type: 'ADD_PLAYER_TO_ROOM', payload: data});
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <GlobalRoomContext.Provider
            value={{
                rooms: roomState,
                getAllRooms,
                createNewRoom,
                deleteGameRoom,
                addPlayer
            }}
        >
            {props.children}
        </GlobalRoomContext.Provider>
    )
}