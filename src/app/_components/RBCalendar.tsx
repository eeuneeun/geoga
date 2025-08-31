"use client";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { CalendarCheck2 } from "lucide-react";
import moment from "moment";
import { useCallback, useMemo, useState } from "react";
import dummyData from "./tmpDummy";
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

export const RBCalendar = (props: any) => {
  const [myEvents, setEvents] = useState(props.expense);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event name");
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  function CustomEvent({ event }) {
    return (
      <div>
        <strong>{event.title}</strong>
        <div style={{ fontSize: "15px", color: "gray" }}>{event.price}</div>
        <span className="category-badge">{event.category}</span>
      </div>
    );
  }

  return (
    <div className="calendar-wrap">
      <h2>
        <CalendarCheck2 />
        캘린더
      </h2>
      <div className="myCustomHeight">
        <Calendar
          localizer={localizer}
          // events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          events={props.expense}
          // eventPropGetter={(event) => {
          //   if (event.type === "background") {
          //     return {
          //       style: {
          //         backgroundColor: "rgba(255, 0, 0, 0.2)", // 반투명 빨강
          //       },
          //     };
          //   }
          //   return {};
          // }}
          components={{
            event: CustomEvent, // 👈 이벤트 렌더링 커스텀
          }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
        />
      </div>
    </div>
  );
};
