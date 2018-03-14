const userReducerInitialState = {};

export const userReducer = (state = userReducerInitialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...action.payload
            }
        case 'USER_LOGOUT':
            return {
                ...action.payload
            }
        case 'GET_STORAGE_STATE_FOR_USER':
            return {
               ...action.payload
            }
        default:
            return state;
    }
}