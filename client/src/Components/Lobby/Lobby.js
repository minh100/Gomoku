import React, { useState, useEffect, useContext } from 'react'

import { RoomList } from './Room/RoomList.js';
import { RoomForm } from './Room/RoomForm.js';

import { GlobalRoomContext } from '../../Global/GlobalRoom/GlobalRoomState.js';
import { GlobalUserContext } from '../../Global/GlobalUser/GlobalUserState.js';
import {SocketContext} from '../../Global/GlobalSocket/Socket.js';

export const Lobby = () => {

  const { getAllRooms } = useContext(GlobalRoomContext);
  const { getAllUsers } = useContext(GlobalUserContext);
  const socket = useContext(SocketContext);
  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    getAllRooms();
    getAllUsers();

    socket.emit('joinLobby');

    return () => {
      socket.off('joinLobby');
    }
  }, [socket]);

  useEffect(() => {
    socket.on('lobby', (roomArray) => {
      console.log(roomArray);
      setAllRooms(roomArray);
      getAllRooms();
    })

    return() => {
      socket.off('lobby');
    }
  }, [allRooms, socket]);

  console.log(`socket: ${socket.id} `);
  console.log(allRooms)

  return (
    <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <RoomForm />
      </div>
      {
        <RoomList rooms={allRooms}/>
      }
    </div>
  );

};
