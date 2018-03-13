import { createStore, combineReducers } from 'redux';
import { todoReducer } from '../reducers/todo.reducer';
import { userReducer } from '../reducers/user.reducer';

export default () => {
    const store = createStore(combineReducers(
        {
            todos: todoReducer,
            user: userReducer
        }
    ))
    return store;
}