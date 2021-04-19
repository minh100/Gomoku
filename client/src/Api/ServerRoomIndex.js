/**
 * this file is essentially used to communicate with the server
 * handles all methods dealing with rooms
 */
import axios from 'axios';

const SERVER_URL_ROOM = 'http://localhost:4001/rooms';

// fetches all rooms from server
export const fetchAllRooms = () => {
    return axios.get(SERVER_URL_ROOM);
}

// creates a room and adds to server
export const createRoom = (newRoom) => {
    return axios.post(SERVER_URL_ROOM, newRoom);
}