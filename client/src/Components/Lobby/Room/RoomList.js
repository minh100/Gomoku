import React, { useState, useEffect } from 'react'

import { IndividualRoom } from './IndividualRoom.js';

export const RoomList = ({ rooms }) => {

    const [roomFilter, setRoomFilter] = useState(rooms);
    const [filter, setFilter] = useState("");
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        setRoomFilter(rooms);
        if (filter !== "") {
            let roomSearch = rooms.filter(room => room.roomName.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
            setRoomFilter(roomSearch);
        }
    }, [filter, rerender]);

    // console.log('rooms', rooms);

    return (
        <div className="container mx-auto px-4 sm:px-0 max-w-5xl">
            <div className="py-8">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                    <h2 className="pl-2 text-2xl leading-tight font-bold">
                        List of Rooms
                    </h2>
                    <div className="text-end pr-2">
                        <form className="flex w-full max-w-sm space-x-3">
                            <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md flex justify-center items-center"
                                onClick={() => setRerender(!rerender)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                            <div className=" relative ">
                                <input type="text" id="&quot;form-subscribe-Filter" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="room..."
                                    autoComplete="off"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    onSubmit={(e) => e.preventDefault()}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-hidden">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th scope="col" className="pl-8 py-3 bg-white font-semibold border-b border-gray-300 text-gray-800 text-left text-sm uppercase">
                                        Room
                                    </th>
                                    <th scope="col" className="px-4 py-3 bg-white font-semibold border-b border-gray-300 text-gray-800 text-left text-sm uppercase">
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
                                    rooms !== undefined && roomFilter.length !== 0 ? (
                                        roomFilter.sort((a, b) => a.playerArray.length - b.playerArray.length)
                                            .map(room => {
                                                return <IndividualRoom key={room._id}
                                                    room={room}
                                                />
                                            })
                                    ) : (
                                        rooms.sort((a, b) => a.playerArray.length - b.playerArray.length)
                                            .map(room => {
                                                return <IndividualRoom key={room._id}
                                                    room={room}
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