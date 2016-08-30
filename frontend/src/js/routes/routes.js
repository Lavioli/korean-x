'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _splashPage = require('../components/splash-page');

var _splashPage2 = _interopRequireDefault(_splashPage);

var _mainApp = require('../components/main-app');

var _mainApp2 = _interopRequireDefault(_mainApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = _react2.default.createElement(
    _reactRouter.Router,
    null,
    _react2.default.createElement(
        _reactRouter.Route,
        { path: '/', component: _splashPage2.default },
        _react2.default.createElement(_reactRouter.Route, { path: 'main', component: _mainApp2.default })
    )
);

module.exports = routes;

//# sourceMappingURL=routes.js.map