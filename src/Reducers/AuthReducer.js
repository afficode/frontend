export const AuthReducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {
                user:action.payload
            };
        case 'GET_USER':
            return {
                state
            }
        case 'LOGOUT': 
            return {
                user: null
            }
        default:
            return state;
    }
}