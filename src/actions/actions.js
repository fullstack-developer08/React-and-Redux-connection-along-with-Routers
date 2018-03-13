export const userLogin = (payload) => ({
    type: 'USER_LOGIN',
    payload
});

export const userLogout = (payload) => ({
    type: 'USER_LOGOUT',
    payload
});

export const addTodo = (payload) => ({
    type: 'ADD_TODO',
    payload
});

export const removeTodo = (payload) => ({
    type: 'REMOVE_TODO',
    payload
});

export const toggleTodo = (payload) => ({
    type: 'TOGGLE_TODO',
    payload
});