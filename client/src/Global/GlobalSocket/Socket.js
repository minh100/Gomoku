import { createContext } from 'react';
import io from 'socket.io-client';

const SERVER = process.env.PORT || 'http://localhost:4001';

export const socket = io(SERVER);
export const SocketContext = createContext(socket);