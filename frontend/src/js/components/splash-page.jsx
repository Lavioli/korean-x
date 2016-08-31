import React from 'react';
import {Link} from 'react-router'

function SplashPage() {
    return (
        <div>
            <section>
                <h1>Korean X</h1>
                <div>Learn language through spaced repetition</div>
            </section>
            <section>
                <a href="/auth/google">
                    Register/Login
                </a>
            </section>
        </div>
    );
}

export default SplashPage;