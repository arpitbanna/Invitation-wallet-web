import React, { createContext, useContext, useState, useEffect } from 'react';

const EventsContext = createContext();

export const useEvents = () => useContext(EventsContext);

export const EventsProvider = ({ children }) => {
    const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem('invitation_wallet_events');
        return savedEvents ? JSON.parse(savedEvents) : [];
    });



    // --- Persist to LocalStorage ---
    useEffect(() => {
        localStorage.setItem('invitation_wallet_events', JSON.stringify(events));
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
