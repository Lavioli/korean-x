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
        this.refs.userAnswer.value = '';
    }

    render() {
        if (!this.props.questions.question) {
            var spans = <span></span>
        } else {
            var letters = this.props.questions.question.split('');
            var spans = letters.map((letter, index) =>
                <span key={index} className="letter" data-letter={letter}>{letter}</span>
            );
        }

        if (this.props.questions.result === -1) {
            var ps = <p></p>
        } else if (this.props.questions.result === true) {
            var ps = <p className="correct">Correct!</p>
        } else {
            var ps = <p className="incorrect">Incorrect...</p>
        }

        return (
            <div>
                <section className="button">
                    <p>Korean X</p>
                    <a className="logout" href="/logout">
                        <span>Log Out</span>
                        <span>To Front</span>
                    </a>
                </section>
                <section>
                    <div>{spans}</div>
                    <form onSubmit={this.submitAnswer}>
                        <input type="text" ref="userAnswer" placeholder="What's it in English?"/>
                    </form>
                </section>
                <section className="score">
                    <p>Your Score: {this.props.questions.score}</p>
                    {ps}
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
