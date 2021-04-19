import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { GlobalUserContext } from '../../Global/GlobalUser/GlobalUserState.js';

export const SignUp = () => {

    const { createNewUser } = useContext(GlobalUserContext);
    const history = useHistory();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [createData, setCreateData] = useState({
        username: '',
        lowerUsername: '',
        password: '',
        rating: 0,
    })
    const [error, setError] = useState(false);
    const [noMatch, setNoMatch] = useState(false);

    const handleCreateAccount = (e) => {
        e.preventDefault();

        if(confirmPassword === createData.password) {
            createNewUser(createData, history, setError);
            setCreateData({
                ...createData,
                password: ""
            });
            setConfirmPassword("");
            setNoMatch(false);
        } else {
            setNoMatch(true);
            setCreateData({
                ...createData,
                password: ""
            });
            setConfirmPassword("");
            setError(false);
        }
    };    

    return (
        <section className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col justify-around lg:flex-row">
                <div className="px-5 pt-6 pb-5 text-center border-2 border-purple-300 rounded lg:w-2/5">
                    <div className="mb-5 font-semibold">Create Account</div>
                    <form onSubmit={handleCreateAccount}>
                        <div className="mb-1 sm:mb-2">
                            <input
                                placeholder="USERNAME"
                                required
                                type="text"
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                name="name"
                                maxlength="26"
                                autoComplete="off"
                                value={createData.username}
                                onChange={(e) => setCreateData({ ...createData, username: e.target.value, lowerUsername: e.target.value.toLowerCase()})}
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
                                value={createData.password}
                                onChange={(e) => setCreateData({ ...createData, password: e.target.value })}
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <input
                                placeholder="CONFIRM PASSWORD"
                                required
                                type="password"
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                name="password-confirm"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center w-full mb-3">
                            <div className="flex items-center border rounded p-2">
                                <button className="mr-3 font-semibold text-black ">
                                    Google
                                    </button>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="black"
                                    className="w-4 h-4"
                                >
                                    <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="mt-4 mb-2 w-full sm:mb-4 bg-purple-600 rounded">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                >
                                    Create Account
                                </button>
                            </div>
                        </div>
                        <Link to="/login">
                            <p className="text-xs text-gray-600 sm:text-sm">
                                Already have an Account? <span className="text-purple-600">Log In</span>
                            </p>
                        </Link>
                    </form>
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
                            Username Already Taken
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
            {noMatch ? (
                <div className="notification">
                    <div className={"text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500"}>
                        <span className="text-xl inline-block mr-5 align-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        <span className="inline-block align-middle mr-8">
                            Passwords Do Not Match
                        </span>
                        <button
                            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                            onClick={() => setNoMatch(false)}
                        >
                            <span>×</span>
                        </button>
                    </div>
                </div>
            ) : null}
        </section>
    )
}