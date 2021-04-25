import React, { useState, useEffect, useContext } from 'react'

import { GlobalUserContext } from '../../Global/GlobalUser/GlobalUserState.js';
import { SocketContext } from '../../Global/GlobalSocket/Socket.js';

export const Leaderboard = () => {

    const { users, getAllUsers } = useContext(GlobalUserContext);
    const [userFilter, setUserFilter] = useState(users);
    const [filter, setFilter] = useState("");
    const socket = useContext(SocketContext);
    const [allUsers, setAllUsers] = useState(users);

    useEffect(() => {
        setUserFilter(users);
        if (filter !== "") {
            let userSearch = users.filter(user => user.username.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
            setUserFilter(userSearch);
        }
    }, [filter]);


    useEffect(() => {
        getAllUsers();
        socket.on('updateLeaderboard', (allNewUsers) => {
            console.log('updateLeaderboard', allNewUsers);
            getAllUsers();
            setAllUsers(allNewUsers);
        })
    }, [socket]);
    console.log('allUsers', allUsers);
    console.log('users', users);

    return (
        <div className="container mx-auto px-4 py-4 sm:px-8 max-w-3xl">
            <div className="py-8">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                    <h2 className="pl-2 text-2xl leading-tight font-bold">
                        Users
                    </h2>
                    <div className="text-end pr-2">
                        <form className="flex w-full max-w-sm space-x-3">
                            <div className=" relative ">
                                <input type="text" id="&quot;form-subscribe-Filter" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="username..."
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
                                        Username
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white font-semibold border-b border-gray-300 text-gray-800 text-left text-sm uppercase">
                                        Rating
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users && userFilter.length !== 0 ? (
                                        userFilter.sort((a, b) => b.rating - a.rating)
                                            .map(user => {
                                                return (
                                                    <tr key={user._id}>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-7/12">
                                                            <div className="flex items-center flex-grow-0">
                                                                <div className="flex-shrink-0">
                                                                    <div dangerouslySetInnerHTML={{ __html: `${user.avatar}` }}></div>
                                                                </div>
                                                                <div className="ml-3">
                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                        {user.username}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <span className="relative inline-block px-3 py-1 font-semibold text-purple-900 leading-tight">
                                                                <span aria-hidden="true" className="absolute inset-0 bg-purple-600 rounded-full">
                                                                </span>
                                                                <span className="relative">
                                                                    <p className="text-white whitespace-no-wrap ">
                                                                        {user.rating}
                                                                    </p>
                                                                </span>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                    ) : (
                                        users.sort((a, b) => b.rating - a.rating)
                                            .map(user => {
                                                return (
                                                    <tr key={user._id}>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-7/12">
                                                            <div className="flex items-center flex-grow-0">
                                                                <div className="flex-shrink-0">
                                                                    <div dangerouslySetInnerHTML={{ __html: `${user.avatar}` }}></div>
                                                                </div>
                                                                <div className="ml-3">
                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                        {user.username}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <span className="relative inline-block px-3 py-1 font-semibold text-purple-900 leading-tight">
                                                                <span aria-hidden="true" className="absolute inset-0 bg-purple-600 rounded-full">
                                                                </span>
                                                                <span className="relative">
                                                                    <p className="text-white whitespace-no-wrap ">
                                                                        {user.rating}
                                                                    </p>
                                                                </span>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
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
};