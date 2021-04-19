import React from 'react'

import { RoomList } from './Room/RoomList.js';
import { RoomForm } from './Room/RoomForm.js';


export const Lobby = () => {

  return (
    <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <RoomForm />
      </div>
      <RoomList />
    </div>
  );

};
