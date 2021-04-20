import React, { useState, useContext } from 'react'

import { Link, useHistory } from 'react-router-dom';
import { GlobalUserContext } from '../Global/GlobalUser/GlobalUserState.js';

export const Navbar = () => {

    const [menuOpen, toggleMenuOpen] = useState(false); // mobile menu
    const [profileOpen, toggleProfileOpen] = useState(false);   // profile menu
    const [navOption, setNavOption] = useState("lobby");
    const history = useHistory();
    const { logout } = useContext(GlobalUserContext);

    // local storage results 
    const [userAccount, setUserAccount] = useState(JSON.parse(localStorage.getItem('profile')));

    const handleSignOut = () => {
        logout();
        toggleProfileOpen(false);
        history.push("/login");
    };

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* <!-- Mobile menu button--> */}
                        <button type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={() => toggleMenuOpen(!menuOpen)}
                        >
                            {/* <!--Icon when menu is closed. * Heroicon name: outline/menu * Menu open: "hidden", * Menu closed: "block"--> */}
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {/* <!--Icon when menu is open. * Heroicon name: outline/x * Menu open: "block", * Menu closed: "hidden"--> */}
                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" onClick={() => setNavOption('lobby')}>
                                <h1 className="text-3xl  text-white" >Gomoku</h1>
                            </Link>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                                <Link to="/"
                                    className={navOption === 'lobby' ? "bg-gray-900 text-white px-3 py-2 rounded-md text-md font-medium" :
                                        "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                                    }
                                    aria-current="page"
                                    onClick={() => setNavOption('lobby')}
                                >
                                    Lobby
                                </Link>
                                <Link to="/leaderboard"
                                    className={navOption === 'leaderboard' ? "bg-gray-900 text-white px-3 py-2 rounded-md text-md font-medium" :
                                        "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                                    }
                                    aria-current="page"
                                    onClick={() => setNavOption('leaderboard')}
                                >
                                    Leaderboard
                                </Link>
                                <Link to="/localplay"
                                    className={navOption === 'localPlay' ? "bg-gray-900 text-white px-3 py-2 rounded-md text-md font-medium" :
                                        "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                                    }
                                    aria-current="page"
                                    onClick={() => setNavOption('localPlay')}
                                >
                                    Local Play
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <h1 className="text-white pl-1">
                            {
                                (userAccount !== undefined && userAccount !== null) ? (userAccount.userResult !== undefined) ? (userAccount.userResult.username) : (userAccount.result !== undefined) ? (userAccount.result.username ): "" : ""
                            }
                        </h1>
                        {/* <!-- Profile dropdown --> */}
                        {
                            ((userAccount !== undefined && userAccount !== null)) ? (
                                <div className="ml-3 relative">
                                    <div>
                                        <button type="button"
                                            className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                            id="user-menu"
                                            aria-expanded="false"
                                            aria-haspopup="true"
                                            onClick={() => toggleProfileOpen(!profileOpen)}
                                        >
                                            <img className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                                alt="" />
                                        </button>
                                    </div>
                                    {/* <!--
                                    Dropdown menu, show/hide based on menu state.

                                    Entering: "transition ease-out duration-100"
                                    From: "transform opacity-0 scale-95"
                                    To: "transform opacity-100 scale-100"
                                    Leaving: "transition ease-in duration-75"
                                    From: "transform opacity-100 scale-100"
                                    To: "transform opacity-0 scale-95"
                                    --> 
                                    */}
                                    {
                                        profileOpen && (
                                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profile</Link>
                                                <button className="block border-t-2 px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full h-full focus:outline-none"
                                                    role="menuitem"
                                                    onClick={() => handleSignOut()}
                                                    type="button"
                                                >
                                                    Sign Out
                                        </button>
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                <Link className="flex-shrink-0 px-4 py-1 pb-2 text-base font-semibold text-purple-600 bg-white rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                                    to="/login"
                                >
                                    Login
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* <!-- Mobile menu, show/hide based on menu state. --> */}
            {
                menuOpen && (
                    <div className="sm:hidden" id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1 flex justify-evenly">
                            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                            <Link to="/"
                                className={navOption === 'lobby' ? "bg-gray-900 text-white px-3 py-2 rounded-md text-md font-medium" :
                                    "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                                }
                                aria-current="page"
                                onClick={() => {
                                    setNavOption('lobby');
                                    toggleMenuOpen(false);
                                }}
                            >
                                Lobby
                                </Link>
                            <Link to="/leaderboard"
                                className={navOption === 'leaderboard' ? "bg-gray-900 text-white px-3 py-2 rounded-md text-md font-medium" :
                                    "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                                }
                                aria-current="page"
                                onClick={() => {
                                    setNavOption('leaderboard');
                                    toggleMenuOpen(false);
                                }}
                            >
                                Leaderboard
                                </Link>
                            <Link to="/localplay"
                                className={navOption === 'localPlay' ? "bg-gray-900 text-white px-3 py-2 rounded-md text-md font-medium" :
                                    "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                                }
                                aria-current="page"
                                onClick={() => {
                                    setNavOption('localPlay');
                                    toggleMenuOpen(false);
                                }}
                            >
                                Local Play
                                </Link>
                        </div>
                    </div>
                )
            }
        </nav>

    )
}