import React, { useState } from 'react';
import { useEvents } from '../context/EventsContext';
import EventCard from '../components/features/EventCard';
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from 'lucide-react';
import './CalendarView.css';

const CalendarView = () => {
    const { events } = useEvents();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Helper to get days in month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Helper to get first day of month (0 = Sun, 1 = Mon...)
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    // Generate calendar grid
    const renderCalendarDays = () => {
        const days = [];
        const emptySlots = firstDay;

        // Empty slots for previous month
        for (let i = 0; i < emptySlots; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Days of month
        for (let d = 1; d <= daysInMonth; d++) {
            // Check if this date has events
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.date === dateStr);
            const hasEvents = dayEvents.length > 0;

            // Check if selected
            const isSelected = selectedDate.getDate() === d &&
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year;

            const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

            days.push(
                <div
                    key={d}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => setSelectedDate(new Date(year, month, d))}
                >
                    <span className="day-number">{d}</span>
                    {hasEvents && (
                        <div className="event-indicators">
                            {dayEvents.map((_, i) => (
                                <span key={i} className="dot"></span>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
        return days;
    };

    const changeMonth = (offset) => {
        setCurrentDate(new Date(year, month + offset, 1));
    };

    // Filter events for selected date
    const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    const selectedEvents = events.filter(e => e.date === selectedDateStr);

    return (
        <div className="container">
            <header className="calendar-header glass-panel">
                <button onClick={() => changeMonth(-1)} className="nav-btn"><ChevronLeft /></button>
                <h2>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => changeMonth(1)} className="nav-btn"><ChevronRight /></button>
            </header>

            <div className="calendar-grid-wrapper glass-panel">
                <div className="weekdays">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="weekday">{day}</div>
                    ))}
                </div>
                <div className="calendar-days">
                    {renderCalendarDays()}
                </div>
            </div>

            <div className="selected-day-events">
                <h3>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                {selectedEvents.length > 0 ? (
                    <div className="day-events-list">
                        {selectedEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="no-events-day">
                        <p>No events today</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendarView;
