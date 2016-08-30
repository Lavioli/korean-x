import React from 'react';

class MainApp extends React.Component {
    render () {
        return (
            <div>
                <section>
                    <h1>Korean X</h1>
                    <form action="">
                        <button type="submit">Log Out</button>
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
}

module.exports = MainApp;