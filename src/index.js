import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import registerServiceWorker from './registerServiceWorker';
import { AppRouter } from './routers/app.router';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

const template = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(template, document.getElementById('root'));
registerServiceWorker();
