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
        this.props.dispatch(actions.fetchQuestion());
    }

    submitAnswer(event) {
        event.preventDefault();
        this.props.dispatch(actions.submitAnswer({
            _id: this.props.questions._id,
            answer: this.refs.userAnswer.value
        }));
    }

    render() {
        if (!this.props.questions.question) {
            var spans = <span></span>
        } else {
            var letters = this.props.questions.question.split('');
            var spans = letters.map((letter) =>
                <span className="letter" data-letter={letter}>{letter}</span>
            );
        }

        return (
            <div>
                <section className="button">
                    <p>Korean X</p>
                    <a className="logout" href="/logout">
                        <span>Log Out</span>
                        <span>To Front Page</span>
                    </a>
                </section>
                <section>
                    <div>{spans}</div>
                    <form onSubmit={this.submitAnswer}>
                        <input type="text" ref="userAnswer"/>
                    </form>
                </section>
                <section>
                    <p>Your Score: {this.props.questions.score}</p>
                </section>
            </div>
        )
    }
}

const mapStateToProps = function (state, props) {
    return {
        answers: state.userAnswer,
        questions: state.questions,
    };
};

var Container = connect(mapStateToProps)(MainApp);

module.exports = Container;