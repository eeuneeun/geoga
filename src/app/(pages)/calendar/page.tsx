import DefaultCalendar from "../../_components/DefaultCalendar";
import React from "react";
import { RBCalendar } from "../../_components/RBCalendar";

type Props = {};

export default function Calendar({}: Props) {
  async function addExpense() {
    const res = await fetch(`/api/ledger`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: "식비",
        memo: "샤브샤브 무한리필",
        price: 39800,
        // start: Date.now(),
        // end: Date.now(),
      }),
    });
    const data = await res.json();
    console.log("data", data);
  }

  return (
    <>
      <RBCalendar />
      <button onClick={addExpense}>추가</button>
    </>
  );
}
