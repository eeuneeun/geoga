"use client";

import { MyCalendar } from "./_components/DefaultCalendar";
import "./_styles/calendar.css";
// import "react-big-calendar/lib/sass/styles";
// import "react-big-calendar/lib/addons/dragAndDrop/styles"; // if using DnD

export default function Home() {
  return <MyCalendar />;
}
