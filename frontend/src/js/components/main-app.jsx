import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import actions from '../redux/actions';

class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.submitAnswer = this.submitAnswer.bind(this);
    }
    submitAnswer(event) {
        event.preventDefault();
        this.props.dispatch( actions.submitAnswer( this.refs.userAnswer.value ) );
    }
    render () {
        return (
            <div>
                <section>
                    <h1>Korean X</h1>
                    <a href="/logout">Log Out</a>
                </section>
                <section>
                    <div>{this.props.answers}</div>
                    <form onSubmit={this.submitAnswer}>
                        <input type="text" ref="userAnswer" />
                    </form>
                </section>
                <section>
                    <div>Your Score: 100</div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = function(state, props) {
    return {
        answers: state.userAnswer
    };
};

var Container = connect(mapStateToProps)(MainApp);

module.exports = Container;