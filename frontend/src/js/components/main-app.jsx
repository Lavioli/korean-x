import React from 'react';
import {Link} from 'react-router'

function MainApp() {
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
                    Some Words in Korean
                </div>
                <form action="">
                    <input type="text"/>
                </form>
            </section>
            <section>
                <div>Your Score: 75</div>
            </section>
        </div>
    );
}

export default MainApp;