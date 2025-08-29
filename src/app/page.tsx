"use client";

import "./_styles/calendar.css";
import Calendar from "./(pages)/calendar/page";
import Summary from "./(pages)/summary/page";
import Recent from "./(pages)/recent/page";
import AddDialog from "./_components/AddDialog";
// import "react-big-calendar/lib/sass/styles";
// import "react-big-calendar/lib/addons/dragAndDrop/styles"; // if using DnD

export default function Home() {
  // return <MyCalendar />
  return (
    <>
      <div>
        <Calendar />
        <Summary />
        <Recent />
      </div>
      {/* <AddDialog /> */}
    </>
  );
}
