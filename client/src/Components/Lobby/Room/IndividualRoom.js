import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import './IndividualRoom.css';

export const IndividualRoom = ({ roomName, password, playerArray }) => {

    const [passwordInput, setPasswordInput] = useState("");
    const [joinRedirect, setJoinRedirect] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    const handleJoin = () => {
        if (passwordInput === password && playerArray.length != 2) {
            // add user to room
            // rerender to room
            setJoinRedirect(true);
            setWrongPassword(false);
        } else {
            setWrongPassword(true);
        }
    }

    return (
        <>
            {
                joinRedirect && (<Redirect to="/localplay" />)  // if password inputted is correct then redirect to the game
            }
            <tr>
                <td className="px-8 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {roomName}
                        </p>
                    </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {playerArray.length}/2
                </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex w-25 justify-between">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                        </span>
                        <span className="relative">
                            {password !== '' ? "Required" : "None"}
                        </span>
                    </span>
                    {
                        password !== "" && (
                            <input type="text" name="password"
                                className="focus:outline-none focus:ring-2 focus:ring-blue-600 block w-1/2 pl-2 sm:text-sm border-gray-300 rounded-md"
                                placeholder="password..."
                                required="on"
                                autoComplete="off"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                            >
                            </input>
                        )
                    }
                </td>
                <td className="px-5 pb-5 pt-3 border-b border-gray-200 bg-white text-sm">
                    <button className="flex-shrink-0 px-4 py-1 pb-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                        onClick={() => handleJoin()}
                    >
                        Join
                    </button>
                </td>
            </tr>
            {wrongPassword ? (
                <div className="notification">
                    <div className={"text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500"}>
                        <span className="text-xl inline-block mr-5 align-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        <span className="inline-block align-middle mr-8">
                            Wrong Password
                    </span>
                        <button
                            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                            onClick={() => setWrongPassword(false)}
                        >
                            <span>×</span>
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    )
}