import {createStore, applyMiddleware, compose} from 'redux';
const thunk = require('redux-thunk').default;
import reducer from './reducers';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;