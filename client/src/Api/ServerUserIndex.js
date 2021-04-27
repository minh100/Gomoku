/**
 * this file is essentially used to communicate with the server
 * handles all methods dealing with users
 */
import axios from 'axios';

// const SERVER_URL_USER = 'https://gomoku0server.herokuapp.com/users'     // url for deployment
const SERVER_URL_USER = 'http://localhost:4001/users';                  // url for development

export const fetchAllUsers = () => {
    return axios.get(SERVER_URL_USER);
}

export const logIn = (formData) => {
    return axios.post(`${SERVER_URL_USER}/login`, formData);
}

export const signUp = (formData) => {
    return axios.post(`${SERVER_URL_USER}/signup`, formData);
}