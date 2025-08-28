import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarCheck2 } from "lucide-react";
import React, { useMemo, useState } from "react";

type Props = {};

export default function DefaultCalendar({}: Props) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(today));
  //   const [transactions, setTransactions] = useState<Transaction[]>(seed);
  //   const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  //   const [editing, setEditing] = useState<Transaction | null>(null);
  //   const [filterType, setFilterType] = useState<"all" | TxType>("all");

  // Derived month range
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const gridStart = startOfWeek(monthStart, { locale: ko });
  const gridEnd = endOfWeek(monthEnd, { locale: ko });

  const days: Date[] = [];
  for (let d = gridStart; d <= gridEnd; d = addDays(d, 1)) days.push(d);

  //   const dayTotals = useMemo(() => {
  //     const map: Record<
  //       string,
  //       { income: number; expense: number; items: Transaction[] }
  //     > = {};
  //     filteredTx.forEach((t) => {
  //       map[t.date] = map[t.date] || { income: 0, expense: 0, items: [] };
  //       if (t.type === "income") map[t.date].income += t.amount;
  //       else map[t.date].expense += t.amount;
  //       map[t.date].items.push(t);
  //     });
  //     return map;
  //   }, [filteredTx]);
  return (
    <div className="calendar-wrap">
      <h2>
        <CalendarCheck2 />
        캘린더
      </h2>
      <div className="calendar">
        <div className="flex-center">
          <div className="year-month flex-center">
            <button> &lt; </button>
            <span>2025년</span>
            <span>08월</span>
            <button> &gt; </button>
          </div>
          <div className="filter">
            <select name="" id="">
              <option value="all">전체</option>
            </select>
          </div>
        </div>
        <div>
          <ul className="date">
            <li>일</li>
            <li>월</li>
            <li>화</li>
            <li>수</li>
            <li>목</li>
            <li>금</li>
            <li>토</li>
          </ul>
          <ul className="day">
            {days.map((day) => {
              const iso = format(day, "yyyy-MM-dd");
              const inMonth = isSameMonth(day, monthStart);
              const isToday = isSameDay(day, new Date());
              // const data = dayTotals[iso];
              // const income = data?.income || 0;
              // const expense = data?.expense || 0;

              return (
                <li key={iso} className={`${isToday ? "today" : ""}`}>
                  {format(day, "d", { locale: ko })}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
