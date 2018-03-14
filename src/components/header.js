import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
    <nav className="navbar is-info">
        <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
            </a>
            <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div id="navbarExampleTransparentExample" className="navbar-menu">
            <div className="navbar-start">
                <Link className="navbar-item" to="">
                    Home
                </Link>
                <Link className="navbar-item" to="user-register">
                    Register
                </Link>
            </div>
        </div>
    </nav>
)