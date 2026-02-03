import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Bell, Shield, Info, Smartphone } from 'lucide-react';
import './Settings.css';

const Settings = () => {
    const navigate = useNavigate();
    const { language, setLanguage, t } = useLanguage();
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
                <h2>{t('settings')}</h2>
                <div style={{ width: 44 }}></div> {/* Spacer to center title */}
            </header>

            <section className="settings-section glass-panel">
                <h3>{t('appearance')}</h3>
                <div className="theme-grid">
                    {themes.map(tOption => (
                        <button
                            key={tOption.id}
                            className={`theme-btn ${theme === tOption.id ? 'active' : ''}`}
                            onClick={() => setTheme(tOption.id)}
                        >
                            {tOption.icon ? tOption.icon : <div className="color-dot" style={{ background: tOption.color }}></div>}
                            <span>{tOption.name}</span>
                        </button>
                    ))}
                </div>
            </section>

            <section className="settings-section glass-panel">
                <h3>{t('general')}</h3>

                <div className="setting-row">
                    <div className="setting-info">
                        <div className="icon-wrap"><Info size={18} /></div>
                        <span>{t('language')}</span>
                    </div>
                    <div className="language-toggle">
                        <button
                            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                            onClick={() => setLanguage('en')}
                        >
                            English
                        </button>
                        <button
                            className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
                            onClick={() => setLanguage('hi')}
                            style={{ marginLeft: '8px' }}
                        >
                            हिंदी
                        </button>
                    </div>
                </div>

                <div className="setting-row">
                    <div className="setting-info">
                        <div className="icon-wrap"><Bell size={18} /></div>
                        <span>{t('notifications')}</span>
                    </div>
                    <label className="switch">
                        <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="setting-row">
                    <div className="setting-info">
                        <div className="icon-wrap"><Smartphone size={18} /></div>
                        <span>{t('haptic_feedback')}</span>
                    </div>
                    <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider round"></span>
                    </label>
                </div>
            </section>

            <section className="settings-section glass-panel">
                <h3>{t('about')}</h3>
                <div className="setting-row" onClick={() => alert("Invitation Wallet v1.0.0")}>
                    <div className="setting-info">
                        <div className="icon-wrap"><Info size={18} /></div>
                        <span>{t('version')}</span>
                    </div>
                    <span className="setting-value">1.0.0</span>
                </div>
                <div className="setting-row">
                    <div className="setting-info">
                        <div className="icon-wrap"><Shield size={18} /></div>
                        <span>{t('privacy_policy')}</span>
                    </div>
                </div>
            </section>

            <div className="developer-credit" style={{ textAlign: 'center', marginTop: '30px', color: 'var(--color-text-muted)', fontSize: '0.9rem', opacity: 0.7 }}>
                {t('developer_credit')}
            </div>

        </div>
    );
};

export default Settings;
