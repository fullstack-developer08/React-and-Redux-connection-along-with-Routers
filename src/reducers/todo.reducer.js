const todoReducerInitialState = [];

export const todoReducer = (state = todoReducerInitialState, action) => {
    switch(action.type){
        case 'ADD_TODO':
            return {
                ...action.payload
            }
        case 'REMOVE_TODO':
            return {
                ...action.payload
            }
        case 'TOGGLE_TODO':
            return {
                ...action.payload
            }
        default:
            return state;
    }
}