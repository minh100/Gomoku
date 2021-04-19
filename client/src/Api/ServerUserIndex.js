/**
 * this file is essentially used to communicate with the server
 * handles all methods dealing with users
 */
import axios from 'axios';

const SERVER_URL_USER = 'http://localhost:4001/users';

export const logIn = (formData) => {
    return axios.post(`${SERVER_URL_USER}/login`, formData);
}

export const signUp = (formData) => {
    return axios.post(`${SERVER_URL_USER}/signup`, formData);
}