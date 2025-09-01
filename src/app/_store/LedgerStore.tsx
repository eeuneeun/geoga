import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DialogStore {
  recentList: [];
  setRecentList: () => void;
  clearRecentList: () => void;
}

export const useLedgerStore = create<DialogStore>()(
  persist(
    (set) => ({
      recentList: [],
      setRecentList: async () => {
        const res = await fetch("/api/ledger", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        set({
          recentList: data,
        });
      },
      clearRecentList: () => {},
    }),
    {
      name: "dialog-storage", // localStorage key
    }
  )
);
