import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Router, browserHistory } from 'react-router';
import { devToolsEnhancer, composeEnhancers } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import jwtDecode from 'jwt-decode'
///---
import reducers from './redux/reducers'
import routes from './routes';
import config from './configure'

const store = createStore(reducers, devToolsEnhancer(), applyMiddleware(thunk))

const token = localStorage.getItem('token')
if (token) {
    const decodeToken = jwtDecode(token)
    store.dispatch({ type: 'AUTH_USER', payload: decodeToken })
} else {
    //ถำไมม token ให redirect ไปยงหนำ signin
    browserHistory.push('signin')
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} basename={config.BASENAME} />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
