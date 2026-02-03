import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import { ArrowLeft, Calendar, Clock, MapPin, Share2, X, Link, Image as ImageIcon, MessageSquare, Edit } from 'lucide-react';
import './EventDetails.css';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getEventById, deleteEvent } = useEvents();
    const [event, setEvent] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [shareMenuOpen, setShareMenuOpen] = useState(false);

    useEffect(() => {
        const e = getEventById(id);
        if (e) {
            setEvent(e);
        }
    }, [id, getEventById]);

    if (!event) return <div className="loading">Loading...</div>;

    const images = event.images || (event.image ? [event.image] : []);
    const mainImage = images.length > 0 ? images[activeImageIndex] : null;

    const handleShareClick = () => {
        setShareMenuOpen(true);
    };

    const closeShareMenu = () => {
        setShareMenuOpen(false);
    };

    // --- Share Logic ---

    // 1. Share Link
    const shareLink = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: event.title,
                    url: url
                });
            } catch (err) { console.log("Share skipped") }
        } else {
            navigator.clipboard.writeText(url);
            alert("Link copied!");
        }
        closeShareMenu();
    }

    // 2. Share Image (Best Effort)
    const shareImage = async () => {
        if (!mainImage) return;

        try {
            // Convert base64 to blob
            const base64Response = await fetch(mainImage);
            const blob = await base64Response.blob();
            const file = new File([blob], "invitation.png", { type: "image/png" });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: event.title,
                    text: `Invitation for ${event.title}`
                });
            } else {
                // Fallback: Download it
                const link = document.createElement('a');
                link.href = mainImage;
                link.download = `invitation-${event.title}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (err) {
            console.error("Error sharing image:", err);
            alert("Could not share image directly. Downloading instead.");
            // Fallback download logic repeated or extracted
        }
        closeShareMenu();
    }

    // 3. Share Text
    const shareText = async () => {
        const text = `📅 *${event.title}*\n\n🗓 Date: ${new Date(event.date).toLocaleDateString()}\n⏰ Time: ${event.time}\n📍 Location: ${event.location || 'N/A'}\n📝 Note: ${event.remarks || 'None'}\n\nJoin us!`;

        if (navigator.share) {
            try {
                await navigator.share({
                    text: text
                });
            } catch (err) { console.log("Share skipped") }
        } else {
            navigator.clipboard.writeText(text);
            alert("Event details copied to clipboard!");
        }
        closeShareMenu();
    }

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            deleteEvent(id);
            navigate('/');
        }
    }

    const openLightbox = (index) => {
        setActiveImageIndex(index);
        setLightboxOpen(true);
    }

    return (
        <div className="event-detail-page">
            <div className="detail-header">
                <button onClick={() => navigate(-1)} className="back-btn glass-button">
                    <ArrowLeft size={20} />
                </button>
                <button onClick={handleShareClick} className="share-btn glass-button">
                    <Share2 size={20} />
                </button>
                <button onClick={() => navigate(`/edit/${event.id}`)} className="edit-btn glass-button" style={{ marginLeft: '10px' }}>
                    <Edit size={20} />
                </button>
            </div>

            <div className="full-image-container" style={{ backgroundColor: '#1e293b' }}>
                {mainImage ? (
                    <img
                        src={mainImage}
                        alt={event.title}
                        className="full-image"
                        onClick={() => openLightbox(activeImageIndex)}
                    />
                ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                        No Image
                    </div>
                )}
            </div>

            {images.length > 1 && (
                <div className="thumbnails-scroll glass-panel">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className={`thumb-item ${activeImageIndex === idx ? 'active' : ''}`}
                            onClick={() => setActiveImageIndex(idx)}
                            style={{ backgroundImage: `url(${img})` }}
                        ></div>
                    ))}
                </div>
            )}

            <div className={`detail-sheet glass-panel ${images.length > 1 ? 'with-thumbs' : ''}`}>
                <div className="sheet-handle"></div>

                <h1 className="detail-title">{event.title}</h1>

                <div className="detail-row">
                    <div className="icon-box"><Calendar size={20} /></div>
                    <div className="detail-text">
                        <span className="label">Date</span>
                        <span className="value">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </div>

                <div className="detail-row">
                    <div className="icon-box"><Clock size={20} /></div>
                    <div className="detail-text">
                        <span className="label">Time</span>
                        <span className="value">{event.time}</span>
                    </div>
                </div>

                {event.location && (
                    <div className="detail-row">
                        <div className="icon-box"><MapPin size={20} /></div>
                        <div className="detail-text">
                            <span className="label">Location</span>
                            <span className="value">{event.location}</span>
                        </div>
                    </div>
                )}

                {event.remarks && (
                    <div className="detail-row">
                        <div className="icon-box"><MessageSquare size={20} /></div>
                        <div className="detail-text">
                            <span className="label">Note</span>
                            <span className="value" style={{ whiteSpace: 'pre-wrap' }}>{event.remarks}</span>
                        </div>
                    </div>
                )}

                <button className="delete-link" onClick={handleDelete}>Delete Event</button>
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && mainImage && (
                <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
                    <div className="lightbox-close">
                        <X size={32} />
                    </div>
                    <img src={mainImage} className="lightbox-img" alt="Full screen" onClick={(e) => e.stopPropagation()} />
                </div>
            )}

            {/* Share Sheet Modal */}
            {shareMenuOpen && (
                <div className="share-sheet-overlay" onClick={closeShareMenu}>
                    <div className="share-sheet glass-panel" onClick={e => e.stopPropagation()}>
                        <div className="sheet-handle"></div>
                        <h3>Share via</h3>
                        <div className="share-options">
                            <button className="share-option-btn" onClick={shareLink}>
                                <div className="share-icon-circle"><Link size={24} /></div>
                                <span>Link</span>
                            </button>
                            <button className="share-option-btn" onClick={shareImage}>
                                <div className="share-icon-circle"><ImageIcon size={24} /></div>
                                <span>Image</span>
                            </button>
                            <button className="share-option-btn" onClick={shareText}>
                                <div className="share-icon-circle"><MessageSquare size={24} /></div>
                                <span>Text Details</span>
                            </button>
                        </div>
                        <button className="cancel-share-btn" onClick={closeShareMenu}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDetails;
