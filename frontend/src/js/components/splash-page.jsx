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
                <form action=''>
                    <a href="http://localhost:8080/auth/google">
                        Register/Login
                    </a>
                </form>
            </section>
        </div>
    );
}

export default SplashPage;