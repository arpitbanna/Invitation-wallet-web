import React from 'react';
import { NavLink } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="container not-found-container">
            <div className="not-found-content">
                <h1>404</h1>
                <p>Oops! This page doesn't exist.</p>
                <NavLink to="/" className="home-link">
                    Go Home
                </NavLink>
            </div>
        </div>
    );
};

export default NotFound;
