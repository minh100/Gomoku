import React, { useState, useContext, useEffect } from 'react'

import { GlobalRoomContext } from '../../../Global/GlobalRoom/GlobalRoomState.js';
import { GlobalUserContext } from '../../../Global/GlobalUser/GlobalUserState.js';
import { IndividualRoom } from './IndividualRoom.js';

export const RoomList = () => {

    const { rooms, getAllRooms } = useContext(GlobalRoomContext);
    const { getAllUsers } = useContext(GlobalUserContext);
    const [roomFilter, setRoomFilter] = useState(rooms);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        getAllRooms();
        getAllUsers();
        setRoomFilter(rooms);
        if (filter !== "") {
            let roomSearch = rooms.filter(room => room.roomName.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
            setRoomFilter(roomSearch);
        }
    }, [filter]);

    return (
        <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
            <div className="py-8">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                    <h2 className="pl-2 text-2xl leading-tight font-bold">
                        List of Rooms
                    </h2>
                    <div className="text-end pr-2">
                        <form className="flex w-full max-w-sm space-x-3">
                            <div className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                            </div>
                            <div className=" relative ">
                                <input type="text" id="&quot;form-subscribe-Filter" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="room..."
                                    autoComplete="off"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th scope="col" className="pl-8 py-3 bg-white font-semibold border-b border-gray-300 text-gray-800 text-left text-sm uppercase">
                                        Room
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white font-semibold border-b border-gray-300 text-gray-800 text-left text-sm uppercase">
                                        Player Count
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white font-semibold border-b border-gray-300 text-gray-800 text-left text-sm uppercase">
                                        Password
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white border-b border-gray-300 text-gray-800  text-left text-sm uppercase font-normal">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rooms && roomFilter.length !== 0 ? (
                                        roomFilter.map(room => {
                                            return <IndividualRoom key={room._id}
                                                roomName={room.roomName}
                                                password={room.password}
                                                playerArray={room.playerArray}
                                            />
                                        })
                                    ) : (
                                        rooms.map(room => {
                                            return <IndividualRoom key={room._id}
                                                roomName={room.roomName}
                                                password={room.password}
                                                playerArray={room.playerArray}
                                            />
                                        })
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}