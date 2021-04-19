export default function UserReducer(userState = {userData: null}, action) {
    switch(action.type) {
        case 'FETCH_ALL_USERS':
            return action.payload;
        case 'CREATE_USER':
        case 'LOGIN':
            localStorage.setItem('profile', JSON.stringify(action?.data));
            return {...userState, userData: action?.data};
        case 'LOGOUT':
            localStorage.removeItem('profile');
            return {...userState, userData: null};
        default:
            return userState;
    }
}