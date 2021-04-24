export default function RoomReducer(roomState, action) {
    switch(action.type) {
        case 'FETCH_ALL_ROOMS':
            return action.payload;
        case 'CREATE_ROOM':
            return [...roomState, action.payload];
        case 'DELETE_ROOM':
            return roomState.filter(room => room._id !== action.payload);
        case 'ADD_PLAYER_TO_ROOM':
            return roomState.map(room => {
                console.log(action);
                return room._id === action.payload._id ? 
                action.payload : room
            });
        default:
            return roomState;
    }
}