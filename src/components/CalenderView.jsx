import { useState, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const rawData = {
  "15-12-2025": [{ user_1: 5 }, { user_2: 8 }],
  "20-12-2025": [{ user_1: 3 }, { user_2: 7 }, { user_3: 2 }],
  "25-12-2025": [{ user_1: 9 }],
  "05-12-2025": [{ user_1: 4 }, { user_2: 6 }],
};

const convertToEvents = (data) => {
  return Object.keys(data).map((dateStr) => {
    const date = moment(dateStr, "DD-MM-YYYY").toDate();
    return {
      title: "Data",
      start: date,
      end: date,
      allDay: true,
      resource: data[dateStr],
    };
  });
};

export default function CalendarView() {
  const events = useMemo(() => convertToEvents(rawData), []);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectSlot = (slot) => {
    const formatted = moment(slot.start).format("DD-MM-YYYY");
    setSelectedDate(rawData[formatted] ? formatted : null);
  };

  const handleSelectEvent = (event) => {
    const formatted = moment(event.start).format("DD-MM-YYYY");
    setSelectedDate(formatted);
  };

  const selectedData = selectedDate ? rawData[selectedDate] : null;

  return (
    <div style={{ padding: 20 }}>
      <h2>React Big Calendar – Month / Week / Day View</h2>

      <div style={{ height: 500, marginTop: 20 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          views={["month", "week", "day"]}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
        />
      </div>

      {selectedData && (
        <div style={{ marginTop: 20, padding: 15, border: "1px solid #ccc" }}>
          <h3>Data for {selectedDate}</h3>
          {selectedData.map((item, i) =>
            Object.entries(item).map(([user, value]) => (
              <div key={i}>
                {user}: {value}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
