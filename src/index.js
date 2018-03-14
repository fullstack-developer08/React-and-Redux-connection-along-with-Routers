import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import registerServiceWorker from './registerServiceWorker';
import { AppRouter } from './routers/app.router';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { setValue } from './common/localStorage';

const store = configureStore();
store.subscribe(() => setValue('state', store.getState()));

const template = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(template, document.getElementById('root'));
registerServiceWorker();
