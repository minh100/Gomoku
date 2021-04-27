import { createContext } from 'react';
import io from 'socket.io-client';

// const SERVER = 'http://localhost:4001'; // socketio server for development
const SERVER = 'https://gomoku0server.herokuapp.com/'   // socketio server for deployment

export const socket = io(SERVER);
export const SocketContext = createContext(socket);