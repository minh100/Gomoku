import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

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
        avatar: ''
    })
    const [error, setError] = useState(false);
    const [noMatch, setNoMatch] = useState(false);

    const getAvatar = async () => {
        const { data } = await axios.get('https://random-word-api.herokuapp.com/word?number=1');
        const avatar = await axios.get(`https://avatars.dicebear.com/api/bottts/${data[0]}.svg?h=35&w=35&r=50`);
        setCreateData({...createData, avatar: avatar.data});
    }

    useEffect(() => {
        getAvatar();;
    }, [])

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
                                maxLength="26"
                                minLength="4"
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
                                minLength="4"
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