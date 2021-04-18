import React, { useContext, useEffect } from 'react'

import { GlobalRoomContext } from '../../../Global/GlobalRoom/GlobalRoomState.js';

export const RoomList = () => {

    const { rooms, getAllRooms } = useContext(GlobalRoomContext);

    useEffect(() => {
        getAllRooms();
    }, [])

    return (
        <div>
            RoomList
            <div>
                {
                    rooms && (
                        rooms.map(room => {
                            return (
                                <div key={room._id}>
                                    {room.roomName}
                                </div>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}