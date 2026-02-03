import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="main-layout">
            <div className="content-area">
                {children}
            </div>
            <Navbar />
        </div>
    );
};

export default Layout;
