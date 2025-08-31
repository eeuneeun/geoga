import DefaultCalendar from "../../_components/DefaultCalendar";
import React, { useEffect, useState } from "react";
import { RBCalendar } from "../../_components/RBCalendar";

type Props = {};

export default function Calendar({}: Props) {
  const [expense, setExpense] = useState([]);
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

  async function getExpense() {
    const res = await fetch("/api/ledger", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log("data", data);

    const tmpArr = [];
    await data.map((item, idx) => {
      const tmpData = {
        title: item.memo,
        category: item.category,
        price: item.price,
        start: new Date(`${item.start}`),
        end: new Date(`${item.end}`),
        allDay: true,
        resource: "block", // 선택 (커스텀 데이터)
        // 👇 이 속성이 핵심!
        type: "background",
      };
      tmpArr.push(tmpData);
    });

    console.log(tmpArr);
    setExpense(tmpArr);
  }

  useEffect(() => {
    getExpense();
  }, []);

  return (
    <>
      <RBCalendar expense={expense} />
      <button onClick={addExpense}>추가</button>
    </>
  );
}
