import React, { createContext, useContext, useState, useEffect } from 'react';

const EventsContext = createContext();

export const useEvents = () => useContext(EventsContext);

export const EventsProvider = ({ children }) => {
    const [events, setEvents] = useState(() => {
        try {
            const savedEvents = localStorage.getItem('invitation_wallet_events');
            return savedEvents ? JSON.parse(savedEvents) : [];
        } catch (error) {
            console.error("Failed to load events:", error);
            return [];
        }
    });



    // --- Persist to LocalStorage ---
    useEffect(() => {
        try {
            localStorage.setItem('invitation_wallet_events', JSON.stringify(events));
        } catch (error) {
            console.error("Failed to save events to Local Storage:", error);
            if (error.name === 'QuotaExceededError' || error.message.includes('quota')) {
                alert("Storage Limitation: The image is too large to save locally. Please try a smaller image or delete old events.");
                // Optionally revert the state change here if possible, but complex.
                // For now, at least preventing the white screen crash is priority.
            }
        }
    }, [events]);

    // --- Actions ---
    const addEvent = (event) => {
        setEvents((prev) => [...prev, { ...event, id: Date.now().toString() }]);
    };

    const deleteEvent = (id) => {
        setEvents((prev) => prev.filter((event) => event.id !== id));
    };

    const updateEvent = (updatedEvent) => {
        setEvents((prev) => prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
    };

    const getEventById = (id) => {
        return events.find((event) => event.id === id);
    };

    return (
        <EventsContext.Provider value={{ events, addEvent, deleteEvent, getEventById, updateEvent }}>
            {children}
        </EventsContext.Provider>
    );
};
