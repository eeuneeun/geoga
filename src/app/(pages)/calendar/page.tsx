import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { RBCalendar } from "src/app/_components/RBCalendar";
import { useLedgerStore } from "src/app/_store/LedgerStore";

type Props = {};

export default function Calendar({}: Props) {
  const [expense, setExpense] = useState([]);
  const { startOfMonth, endOfMonth } = useLedgerStore();
  async function getExpense() {
    const res = await fetch(
      `/api/ledger?start=${startOfMonth}&end=${endOfMonth}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
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
        isIncome: item.isIncome,
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
      <RBCalendar expense={expense} getExpense={getExpense} />
    </>
  );
}
