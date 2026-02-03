import React, { useMemo } from 'react';
import { useEvents } from '../context/EventsContext';
import EventCard from '../components/features/EventCard';
import { NavLink, Link } from 'react-router-dom';
import { Plus, Settings as SettingsIcon } from 'lucide-react';
import './Home.css';

const Home = () => {
    const { events } = useEvents();

    // --- Derived State: Sort & Filter Events ---
    const { upcomingEvents, pastEvents } = useMemo(() => {
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Start of today

        const upcoming = [];
        const past = [];

        events.forEach(event => {
            // Parse YYYY-MM-DD to local midnight for accurate comparison
            const [y, m, d] = event.date.split('-').map(Number);
            const dateObj = new Date(y, m - 1, d);

            if (dateObj >= now) {
                upcoming.push(event);
            } else {
                past.push(event);
            }
        });

        return {
            upcomingEvents: upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)),
            pastEvents: past.sort((a, b) => new Date(b.date) - new Date(a.date)) // Newest past event first
        };
    }, [events]);

    const hasEvents = upcomingEvents.length > 0 || pastEvents.length > 0;

    return (
        <div className="container">
            <header className="home-header">
                <div>
                    <h1>Your Events</h1>
                    <div className="header-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                </div>
                <Link to="/settings" className="settings-link glass-button">
                    <SettingsIcon size={20} />
                </Link>
            </header>

            {!hasEvents ? (
                <div className="empty-state">
                    <div className="empty-illustration glass-panel">
                        <span style={{ fontSize: '40px' }}>🎉</span>
                    </div>
                    <h3>No Invitations Yet</h3>
                    <p>Add your first invitation card to get started.</p>
                    <NavLink to="/add" className="cta-button">
                        <Plus size={20} />
                        Create Event
                    </NavLink>
                </div>
            ) : (
                <div className="event-lists-container">
                    <section className="event-section">
                        <h2 className="section-title">Upcoming</h2>
                        {upcomingEvents.length > 0 ? (
                            <div className="event-list">
                                {upcomingEvents.map(event => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        ) : (
                            <p className="section-empty">No upcoming events.</p>
                        )}
                    </section>

                    {pastEvents.length > 0 && (
                        <section className="event-section past-section">
                            <h2 className="section-title">Past Events</h2>
                            <div className="event-list">
                                {pastEvents.map(event => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
