import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import ImageUpload from '../components/common/ImageUpload';
import './AddEvent.css';

const AddEvent = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Check if we are editing
    const { addEvent, getEventById, updateEvent } = useEvents();

    // --- Form State ---
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        remarks: '',
        images: []
    });

    const [loading, setLoading] = useState(false);
    const isEditing = !!id;

    // --- Load Event Data for Editing ---
    useEffect(() => {
        if (isEditing) {
            const eventToEdit = getEventById(id);
            if (eventToEdit) {
                // Compatible with old data structure (image string vs images array)
                const existingImages = eventToEdit.images || (eventToEdit.image ? [eventToEdit.image] : []);

                setFormData({
                    title: eventToEdit.title,
                    date: eventToEdit.date,
                    time: eventToEdit.time,
                    location: eventToEdit.location || '',
                    remarks: eventToEdit.remarks || '',
                    images: existingImages
                });
            } else {
                alert("Event not found!");
                navigate('/');
            }
        }
    }, [id, isEditing, getEventById, navigate]);

    // --- Handlers ---
    const handleImagesSelect = (base64Images) => {
        setFormData(prev => ({ ...prev, images: base64Images }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.date) {
            alert("Please select a Date for the event.");
            return;
        }

        setLoading(true);

        const finalEvent = {
            ...formData,
            title: formData.title || 'Untitled Event',
            time: formData.time || new Date().toTimeString().slice(0, 5),
            id: isEditing ? id : undefined // Keep existing ID if editing
        };

        setTimeout(() => {
            if (isEditing) {
                updateEvent(finalEvent);
            } else {
                addEvent(finalEvent);
            }
            setLoading(false);
            navigate(isEditing ? `/event/${id}` : '/');
        }, 500);
    };

    return (
        <div className="container">
            <h2 className="page-title">{isEditing ? 'Edit Invitation' : 'New Invitation'}</h2>

            <form onSubmit={handleSubmit} className="add-event-form">
                <ImageUpload
                    onImagesSelect={handleImagesSelect}
                    initialImages={formData.images}
                />

                <div className="form-group">
                    <label>Event Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. John's Birthday"
                        className="input-field glass-panel"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group half">
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="input-field glass-panel"
                            required
                        />
                    </div>

                    <div className="form-group half">
                        <label>Time</label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="input-field glass-panel"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Location (Optional)</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Central Park"
                        className="input-field glass-panel"
                    />
                </div>

                <div className="form-group">
                    <label>Remark (Optional)</label>
                    <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        placeholder="e.g. Bring a gift, Dress code: Casual"
                        className="input-field glass-panel"
                        rows="3"
                    />
                </div>

                <button type="submit" className="save-button" disabled={loading}>
                    {loading ? 'Saving...' : (isEditing ? 'Update Invitation' : 'Save Invitation')}
                </button>
            </form>
        </div>
    );
};

export default AddEvent;
