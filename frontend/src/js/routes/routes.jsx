import React from 'react';
import {Router, Route, hashHistory} from 'react-router';
import SplashPage from '../components/splash-page'
import MainApp from '../components/main-app'

const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={SplashPage} />
        <Route path="main" component={MainApp} />
    </Router>
);

export default routes;