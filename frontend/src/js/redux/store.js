import {createStore, applyMiddleware, compose} from 'redux';
const thunk = require('redux-thunk').default;
import reducer from './reducers';

let store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;