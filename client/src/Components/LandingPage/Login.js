import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';

import { GlobalUserContext } from '../../Global/GlobalUser/GlobalUserState.js';

export const Login = () => {

    const { login } = useContext(GlobalUserContext);
    const history = useHistory();
    const [loginData, setloginData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        login(loginData, history, setError);
    };

    return (
        <div className="px-4 py-15 mx-auto mt-10 sm:mt-0 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20" >
            <div className="flex flex-col justify-around lg:flex-row">
                <div className="mb-12 lg:max-w-lg lg:pr-5 lg:mb-0">
                    <div className="max-w-xl mb-6">
                        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                            Welcome To <span className="inline-block text-purple-600">Gomoku</span>
                        </h2>
                        <p className="text-base text-gray-700 md:text-lg">
                            Play Gomoku Against Others and See How You Rank!
                        </p>
                    </div>
                    <hr className="mb-6 border-gray-300" />
                    <div className="flex">
                        <a href="https://www.linkedin.com/in/minh100/" target="_blank" rel="noreferrer" aria-label="Play Song" className="mr-3">
                            <div className="flex items-center justify-center w-10 h-10 transition duration-300 transform rounded-full shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#7C3AED">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                        </a>
                        <div className="flex justify-center items-center">
                            <a href="https://www.linkedin.com/in/minh100/" target="_blank" rel="noreferrer" className="text-sm font-semibold">
                                Minh Truong
                            </a>
                        </div>
                    </div>
                </div>
                <div className="px-5 pt-6 pb-5 text-center border-2 border-purple-300 rounded lg:w-2/5">
                    <div className="mb-5 font-semibold">Sign In</div>
                    <form onSubmit={handleLogin}>
                        <div className="mb-1 sm:mb-2">
                            <input
                                placeholder="USERNAME"
                                required
                                type="text"
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                name="name"
                                autoComplete="off"
                                value={loginData.username}
                                onChange={(e) => setloginData({ ...loginData, username: e.target.value })}
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <input
                                placeholder="PASSWORD"
                                required
                                type="password"
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                name="password"
                                autoComplete="off"
                                value={loginData.password}
                                onChange={(e) => setloginData({ ...loginData, password: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="mt-4 mb-2 w-40 sm:mb-4 bg-purple-600 rounded transform rotate-180 inline-flex items-center justify-center w-25 h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                type="submit"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center w-full mb-5">
                        <hr className="flex-1 border-gray-300" />
                        <div className="px-3 text-xs text-gray-500 sm:text-sm">or</div>
                        <hr className="flex-1 border-gray-300" />
                    </div>
                    <div className="flex justify-around">
                        <Link
                            to="/signup"
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold transition duration-200 bg-white border border-gray-300 rounded md:w-auto hover:bg-gray-100 focus:shadow-outline focus:outline-none"
                        >
                            Create Account
                        </Link>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold transition duration-200 bg-white border border-gray-300 rounded md:w-auto hover:bg-gray-100 focus:shadow-outline focus:outline-none"
                        >
                            Guest Account
                        </Link>
                    </div>

                </div>
            </div>
            {error ? (
                <div className="notification">
                    <div className={"text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500"}>
                        <span className="text-xl inline-block mr-5 align-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        <span className="inline-block align-middle mr-8">
                            Invalid Credentials
                        </span>
                        <button
                            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                            onClick={() => setError(false)}
                        >
                            <span>×</span>
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    )
}