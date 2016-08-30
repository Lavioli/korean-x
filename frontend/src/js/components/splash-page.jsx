import React from 'react';
import { Link } from 'react-router'

class SplashPage extends React.Component {
    render () {
        return (
            <div>
                <section>
                    <h1>Korean X</h1>
                    <div>Learn language through spaced repetition</div>
                </section>
                <section>
                    <form action="">
                        <Link to="/main"><button type="submit">Register/Login</button></Link>
                    </form>
                </section>
            </div>
        );
    }
}

module.exports = SplashPage;