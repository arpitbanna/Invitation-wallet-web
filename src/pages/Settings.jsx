import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Bell, Shield, Info, Smartphone } from 'lucide-react';
import './Settings.css';

const Settings = () => {
    const navigate = useNavigate();
    // Simple theme state management (could be moved to context if it grows)
    const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'dark');
    const [notifications, setNotifications] = useState(true);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    // --- Theme Config ---
    const themes = [
        { id: 'dark', name: 'Dark', icon: <Moon size={18} /> },
        { id: 'light', name: 'Light', icon: <Sun size={18} /> },
        { id: 'ocean', name: 'Ocean', color: '#0ea5e9' },
        { id: 'sunset', name: 'Sunset', color: '#f43f5e' }
    ];

    return (
        <div className="container settings-page">
            <header className="settings-header">
                <button onClick={() => navigate(-1)} className="back-btn glass-button">
                    <ArrowLeft size={20} />
                </button>
                <h2>Settings</h2>
                <div style={{ width: 44 }}></div> {/* Spacer to center title */}
            </header>

            <section className="settings-section glass-panel">
                <h3>Appearance</h3>
                <div className="theme-grid">
                    {themes.map(t => (
                        <button
                            key={t.id}
                            className={`theme-btn ${theme === t.id ? 'active' : ''}`}
                            onClick={() => setTheme(t.id)}
                        >
                            {t.icon ? t.icon : <div className="color-dot" style={{ background: t.color }}></div>}
                            <span>{t.name}</span>
                        </button>
                    ))}
                </div>
            </section>

            <section className="settings-section glass-panel">
                <h3>General</h3>

                <div className="setting-row">
                    <div className="setting-info">
                        <div className="icon-wrap"><Bell size={18} /></div>
                        <span>Notifications</span>
                    </div>
                    <label className="switch">
                        <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="setting-row">
                    <div className="setting-info">
                        <div className="icon-wrap"><Smartphone size={18} /></div>
                        <span>Haptic Feedback</span>
                    </div>
                    <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider round"></span>
                    </label>
                </div>
            </section>

            <section className="settings-section glass-panel">
                <h3>About</h3>
                <div className="setting-row" onClick={() => alert("Invitation Wallet v1.0.0")}>
                    <div className="setting-info">
                        <div className="icon-wrap"><Info size={18} /></div>
                        <span>Version</span>
                    </div>
                    <span className="setting-value">1.0.0</span>
                </div>
                <div className="setting-row">
                    <div className="setting-info">
                        <div className="icon-wrap"><Shield size={18} /></div>
                        <span>Privacy Policy</span>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Settings;
