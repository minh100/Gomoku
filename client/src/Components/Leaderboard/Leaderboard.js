import React, { useState, useEffect, useContext } from 'react'

import { GlobalUserContext } from '../../Global/GlobalUser/GlobalUserState.js';

export const Leaderboard = () => {

    const { users } = useContext(GlobalUserContext);
    const [userFilter, setUserFilter] = useState(users);
    const [filter, setFilter] = useState("");
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        setUserFilter(users);
        if (filter !== "") {
            let userSearch = users.filter(user => user.username.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
            setUserFilter(userSearch);
        }
    }, [filter, rerender]);

    return (
        <div className="container mx-auto px-4 py-4 sm:px-8 max-w-3xl">
            <div className="py-8">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                    <h2 className="pl-2 text-2xl leading-tight font-bold">
                        Users
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
                                                                <div dangerouslySetInnerHTML={{__html: `${user.avatar}`}}></div>
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
                                                                    <a href="/" className="block relative">
                                                                        <img alt="profil" src="/images/person/8.jpg" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                                                    </a>
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
                        {/* <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                            <div className="flex items-center">
                                <button type="button" className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                                    <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                        </path>
                                    </svg>
                                </button>
                                <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">
                                    1
                                </button>
                                <button type="button" className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                    2
                                </button>
                                <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100">
                                    3
                                </button>
                                <button type="button" className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                    4
                                </button>
                                <button type="button" className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                                    <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
};