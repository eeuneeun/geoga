"use client";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { CalendarCheck2 } from "lucide-react";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { useDialogStore } from "../_store/DialogStore";
import AddDialog from "./AddDialog";
import { useLedgerStore } from "../_store/LedgerStore";
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

export const RBCalendar = (props: any) => {
  const [myEvents, setEvents] = useState(props.expense);
  const [selectDate, setSelectDate] = useState({
    start: null,
    end: null,
  });
  const { openDialog } = useDialogStore();
  const { startOfMonth, setMonthRange, setRecentList } = useLedgerStore();

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      openDialog();
      setSelectDate({ start, end });
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  function CustomEvent({ event }) {
    console.log(event);
    return (
      <div>
        <Tooltip title={event.title}>
          <div style={{ fontSize: "15px", color: "gray" }}>{event.price}</div>
        </Tooltip>
        <span
          className={`category-badge ${event.isIncome == true ? "income" : ""}`}
        >
          {event.category}
        </span>
      </div>
    );
  }

  useEffect(() => {
    setRecentList();
    props.getExpense();
  }, [startOfMonth]);
  return (
    <>
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
            onNavigate={(date, view, action) => {
              console.log("현재 보이는 기준 날짜:", date);
              console.log("뷰 모드:", view); // month | week | day | agenda
              console.log("액션:", action); // "PREV" | "NEXT" | "DATE" | "TODAY"

              if (action === "PREV") {
                setMonthRange("last");
              }
              if (action === "NEXT") {
                setMonthRange("next");
              }
            }}
          />
        </div>
      </div>

      <AddDialog selectDate={selectDate} getExpense={props.getExpense} />
    </>
  );
};
