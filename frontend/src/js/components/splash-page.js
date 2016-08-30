'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplashPage = function (_React$Component) {
    _inherits(SplashPage, _React$Component);

    function SplashPage() {
        _classCallCheck(this, SplashPage);

        return _possibleConstructorReturn(this, (SplashPage.__proto__ || Object.getPrototypeOf(SplashPage)).apply(this, arguments));
    }

    _createClass(SplashPage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'section',
                    null,
                    _react2.default.createElement(
                        'h1',
                        null,
                        'Korean X'
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        'Learn language through spaced repetition'
                    )
                ),
                _react2.default.createElement(
                    'section',
                    null,
                    _react2.default.createElement(
                        'form',
                        { action: '' },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/main' },
                            _react2.default.createElement(
                                'button',
                                { type: 'submit' },
                                'Register/Login'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SplashPage;
}(_react2.default.Component);

module.exports = SplashPage;

//# sourceMappingURL=splash-page.js.map