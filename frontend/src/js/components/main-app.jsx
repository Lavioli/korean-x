import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import actions from '../redux/actions';

class MainApp extends React.Component {
    submitAnswer (event) {
        event.preventDefault();
        const userAnswer = this.refs.userAnswer.value;
        this.props.dispatch( actions.submitAnswer( userAnswer ) );
    }

    render () {
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
                    <form onSubmit={this.submitAnswer}>
                        <input type="text" ref="userAnswer" />
                    </form>
                </section>
                <section>
                    <div>Your Score: 75</div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = function(state, props) {
    console.log(state, '<---STATE');
    return {
        answers: state.userAnswer
    };
};

var Container = connect(mapStateToProps)(MainApp);

module.exports = Container;