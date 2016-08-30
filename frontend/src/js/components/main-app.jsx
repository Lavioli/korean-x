import React from 'react';
import {Link} from 'react-router';
var connect = require('react-redux').connect;

var actions = require('../redux/actions');

var MainApp = React.createClass({
    submitAnswer: function(event) {
        event.preventDefault();
        var userAnswer = this.refs.userAnswer.value;
        console.log(userAnswer, '<---USER ANSWER');
        this.props.dispatch( actions.submitAnswer( userAnswer ) );
    },
    render: function () {
        console.log(this.props.answers, '<----PROPS  ANSWER');
        return (
            <div>
                <section>
                    <h1>Korean X</h1>
                    <form action="">
                        <Link to="/">
                            <button type="submit">Log Out</button>
                        </Link>
                    </form>
                </section>
                <section>
                    <div>
                    </div>
                    <form action="" onSubmit={this.submitAnswer}>
                        <input type="text" ref="userAnswer" />
                    </form>
                </section>
                <section>
                    <div>Your Score: 75</div>
                </section>
            </div>
        )
    }
});

var mapStateToProps = function(state, props) {
    console.log(state, '<---STATE');
    return {
        answers: state.userAnswer
    };
};

export default connect(mapStateToProps)(MainApp);