import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DialogStore {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogStore>()(
  persist(
    (set) => ({
      isOpen: false,
      openDialog: () => {
        set({
          isOpen: true,
        });
      },
      closeDialog: () => {
        set({
          isOpen: false,
        });
      },
    }),
    {
      name: "dialog-storage", // localStorage key
    }
  )
);
