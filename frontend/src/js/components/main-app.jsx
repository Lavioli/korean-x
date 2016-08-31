import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import actions from '../redux/actions';

class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.submitAnswer = this.submitAnswer.bind(this);
    }

    componentDidMount() {
        this.props.dispatch( actions.fetchQuestion() );
    }

    submitAnswer(event) {
        event.preventDefault();
        this.props.dispatch( actions.submitAnswer( this.refs.userAnswer.value ) );
    }
    render () {
        console.log(this.props.questions, '<---this.props.questions');
        return (
            <div>
                <section>
                    <h1>Korean X</h1>
                    <a href="/logout">Log Out</a>
                </section>
                <section>
                    <div>{this.props.questions}</div>
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
        answers: state.userAnswer,
        questions: state.questions
    };
};

var Container = connect(mapStateToProps)(MainApp);

module.exports = Container;