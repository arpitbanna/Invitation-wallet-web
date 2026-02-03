import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import './EventCard.css';

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/event/${event.id}`);
    };

    // Format Date: "Mon, Oct 24"
    const formatDate = (dateString) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="event-card glass-panel" onClick={handleCardClick}>
            <div className="card-image" style={{
                backgroundImage: (event.images && event.images.length > 0)
                    ? `url(${event.images[0]})`
                    : (event.image ? `url(${event.image})` : 'linear-gradient(135deg, #1e293b, #0f172a)')
            }}>
                {(!event.images || event.images.length === 0) && !event.image && (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '10px' }}>No Image</div>
                )}
            </div>
            <div className="card-content">
                <h3 className="card-title">{event.title}</h3>

                <div className="card-details">
                    <div className="detail-item">
                        <Calendar size={14} className="icon" />
                        <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="detail-item">
                        <Clock size={14} className="icon" />
                        <span>{event.time}</span>
                    </div>
                    {event.location && (
                        <div className="detail-item">
                            <MapPin size={14} className="icon" />
                            <span>{event.location}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventCard;
