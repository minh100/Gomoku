import React, { createContext, useReducer } from 'react'
import UserReducer from './UserReducer.js';

import { fetchAllUsers, logIn, signUp } from '../../Api/ServerUserIndex.js';

export const GlobalUserContext = createContext([]);

export const GlobalUserProvider = props => {
    const [userState, dispatch] = useReducer(UserReducer, []);

    // user actions
    const getAllUsers = async() => {
        try {
            const {data} = await fetchAllUsers();
            dispatch({type: 'FETCH_ALL_USERS', payload: data});
        } catch(error) {
            console.log(error);
        }
    }

    // create a new user
    const createNewUser = async (newUser, history, setError) => {
        try {
            const {data} = await signUp(newUser);
            dispatch({type: 'CREATE_USER', data});
            history.push('/info');
        } catch (error) {
            setError(true);
        }
    };

    // login user
    const login = async (formData, history, setError) => {
        try {
            const { data } = await logIn(formData);
            dispatch({type: 'LOGIN', data});
            history.push('/');
        } catch(error) {
            setError(true);
        }
    }

    // log out user
    const logout = async () => {
        try {
            dispatch({type: "LOGOUT"});
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <GlobalUserContext.Provider
            value={{
                users: userState,
                getAllUsers,
                createNewUser,
                login,
                logout,
                
            }}
        >
            {props.children}
        </GlobalUserContext.Provider>
    )
}