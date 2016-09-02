import React from 'react';
import {Link} from 'react-router'

function SplashPage() {
    return (
        <div>
            <section className="header">
                <div>
                    <span className="letter" data-letter="K">K</span>
                    <span className="letter" data-letter="O">O</span>
                    <span className="letter" data-letter="R">R</span>
                    <span className="letter" data-letter="E">E</span>
                    <span className="letter" data-letter="A">A</span>
                    <span className="letter" data-letter="N">N</span>
                    <span className="letter" data-letter=" "> </span>
                    <span className="letter" data-letter="X">X</span>
                </div>
                <p>Learn 한글[Hangul] through spaced repetition</p>
            </section>
            <section className="button">
                <a href="/auth/google">
                    <span>Log In</span>
                    <span>Register</span>
                </a>
            </section>
        </div>
    );
}

export default SplashPage;