import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Wrapper = styled.div`
  text-align: left;
`;

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "1st interview John Trav",
    allDay: false,
    start: new Date(2023, 1, 0),
    end: new Date(2023, 1, 0),
  },
  {
    title: "1st interview Alla Dok",
    allDay: false,
    start: new Date(2023, 2, 0),
    end: new Date(2023, 2, 0),
  },
  {
    title: "2st interview Melisa Dok",
    allDay: false,
    start: new Date(2023, 2, 0),
    end: new Date(2023, 2, 0),
  },
];

export const CalendarHR = () => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      /*
          console.log(d1 <= d2);
          console.log(d2 <= d3);
          console.log(d1 <= d4);
          console.log(d4 <= d3);
            */
    }

    setAllEvents([...allEvents, newEvent]);
  }

  let formats = {
    timeGutterFormat: "HH:mm",
  };

  return (
    <Wrapper>
      <h1>Calendar</h1>
      <p>Add New Meeting</p>
      <div>
        <input
          type="text"
          placeholder="Add Meeting"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        min={new Date(0, 0, 0, 8, 0, 0)}
        max={new Date(0, 0, 0, 16, 0, 0)}
        formats={formats}
        defaultView="agenda"
        selectable
        startAccessor="start"
        endAccessor="end"
        longPressThreshold={20}
        style={{ height: 500, margin: "50px" }}
        onSelectSlot={(slot) => {
          console.log("slot select: ", slot);
        }}
      />
    </Wrapper>
  );
};
