import React from 'react';
import {Router, Route} from 'react-router';
import SplashPage from '../components/splash-page'
import MainApp from '../components/main-app'

const routes = (
    <Router>
        <Route path="/" component={SplashPage} />
        <Route path="main" component={MainApp} />
    </Router>
);

export default routes;