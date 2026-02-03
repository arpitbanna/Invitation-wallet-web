import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Plus, Calendar } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './Navbar.css';

const Navbar = () => {
    const { t } = useLanguage();
    return (
        <nav className="navbar glass-panel">
            <ul className="nav-list">
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
                        <div className="nav-icon-wrapper">
                            <Home size={24} />
                        </div>
                        <span>{t('home')}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/add" className="nav-item add-button">
                        <div className="add-icon-wrapper">
                            <Plus size={28} color="#fff" />
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/calendar" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
                        <div className="nav-icon-wrapper">
                            <Calendar size={24} />
                        </div>
                        <span>{t('calendar')}</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
