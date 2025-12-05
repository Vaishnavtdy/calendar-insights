import { useSelector, useDispatch } from 'react-redux';
import { useState, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { setSelectedDate, setShowModal } from '../redux/slices/calendarSlice';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarView.css';

const localizer = momentLocalizer(moment);

const convertToEvents = (data) => {
    return Object.keys(data).map((dateStr) => {
        const date = moment(dateStr, 'DD-MM-YYYY').toDate();
        return {
            title: 'Data Available',
            start: date,
            end: date,
            allDay: true,
            resource: data[dateStr],
        };
    });
};

export default function CalendarView() {
    const dispatch = useDispatch();
    const calendarData = useSelector((state) => state.calendar.calendarData);
    const events = useMemo(() => convertToEvents(calendarData), [calendarData]);
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleSelectSlot = (slot) => {
        const formatted = moment(slot.start).format('DD-MM-YYYY');
        dispatch(setSelectedDate(formatted));
        dispatch(setShowModal(true));
    };

    const handleSelectEvent = (event) => {
        const formatted = moment(event.start).format('DD-MM-YYYY');
        dispatch(setSelectedDate(formatted));
        dispatch(setShowModal(true));
    };

    const eventStyleGetter = () => {
        const style = {
            backgroundColor: '#3174ad',
            borderRadius: '4px',
            opacity: 0.8,
            color: 'white',
            border: '2px solid #2563eb',
            display: 'block',
            fontWeight: 'bold',
        };
        return { style };
    };

    const dayPropGetter = (date) => {
        const formatted = moment(date).format('DD-MM-YYYY');
        const hasData = calendarData[formatted];

        if (hasData) {
            return {
                className: 'has-data',
            };
        }
        return {};
    };

    return (
        <div className="calendar-container">
            <h1 className="calendar-title">React Calendar Analytics</h1>
            <p className="calendar-subtitle">Click on highlighted dates to view analytics</p>

            <div className="calendar-wrapper">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    views={['month', 'week', 'day']}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    eventPropGetter={eventStyleGetter}
                    dayPropGetter={dayPropGetter}
                    date={currentDate}
                    onNavigate={setCurrentDate}
                    style={{ height: '600px' }}
                />
            </div>
        </div>
    );
}
