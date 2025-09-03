import dayjs from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DialogStore {
  startOfMonth: dayjs.Dayjs;
  endOfMonth: dayjs.Dayjs;
  recentList: [];
  setMonthRange: (type: "current" | "last" | "next") => void;
  setRecentList: () => void;
  clearRecentList: () => void;
}

export const useLedgerStore = create<DialogStore>()((set, get) => ({
  startOfMonth: dayjs().startOf("month"),
  endOfMonth: dayjs().endOf("month"),
  recentList: [],
  setMonthRange: async (type) => {
    const { startOfMonth } = get();
    let targetMonth = await dayjs(startOfMonth);

    if (type === "last") {
      set({
        startOfMonth: targetMonth.subtract(1, "month"),
        endOfMonth: targetMonth.subtract(1, "month").endOf("month"),
      });
    } else if (type === "next") {
      set({
        startOfMonth: targetMonth.add(1, "month"),
        endOfMonth: targetMonth.add(1, "month").endOf("month"),
      });
    }
  },
  setRecentList: async () => {
    const { startOfMonth, endOfMonth } = get();
    console.log(startOfMonth, endOfMonth);
    const res = await fetch(
      `/api/ledger?start=${startOfMonth}&end=${endOfMonth}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    console.log("data", data);

    set({
      recentList: data,
    });
  },
  clearRecentList: () => {},
}));
