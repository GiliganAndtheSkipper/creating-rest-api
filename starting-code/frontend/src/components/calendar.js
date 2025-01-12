import React from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';

const locales = {
    "en-US": require("date-fns/locale/en-US")
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

const CalendarComponent = ({ events = [] }) => {
    // Ensure event dates are converted into Date objects
    const formattedEvents = events.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
    }));

    return (
        <div className="calendar-container">
            <Calendar
                localizer={localizer}
                events={formattedEvents}
                views={['month', 'week', 'day']}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
            />
        </div>
    );
};

export default CalendarComponent;
