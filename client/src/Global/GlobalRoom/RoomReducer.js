export default function RoomReducer(roomState, action) {
    switch(action.type) {
        case 'FETCH_ALL_ROOMS':
            return action.payload;
        case 'CREATE_ROOM':
            return [...roomState, action.payload];
        default:
            return roomState;
    }
}