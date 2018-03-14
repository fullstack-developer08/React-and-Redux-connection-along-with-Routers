const todoReducerInitialState = {
    todos: []
};

export const todoReducer = (state = todoReducerInitialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return Object.assign({}, state, { todos: state.todos.concat(action.payload) });
        case 'REMOVE_TODO':
            return {
                ...action.payload
            }
        case 'TOGGLE_TODO':
            return {
                ...action.payload
            }
        case 'GET_STORAGE_STATE_FOR_TODO':
            return {
                ...action.payload
            }
        default:
            return state;
    }
}