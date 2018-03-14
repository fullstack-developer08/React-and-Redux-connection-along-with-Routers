import { createStore, combineReducers, applyMiddleware } from 'redux';
import { todoReducer } from '../reducers/todo.reducer';
import { userReducer } from '../reducers/user.reducer';
import thunk from 'redux-thunk';

export default () => {
    const store = createStore(combineReducers(
        {
            todos: todoReducer,
            user: userReducer
        }
    ), applyMiddleware(thunk))
    return store;
}