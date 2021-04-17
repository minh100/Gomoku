import React, { useContext } from 'react'

import { GlobalRoomContext } from '../../../Global/GlobalRoom/GlobalRoomState.js';

export const RoomList = () => {

    const { rooms } = useContext(GlobalRoomContext);
    console.log(rooms);

    return (
        <div>
            RoomList
            <div>
                {
                    rooms && rooms.map(room => {
                        return (
                            <div>
                                <h1>{room.id}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}