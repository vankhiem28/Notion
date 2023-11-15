"use client";

import { create } from "zustand";

type SettingStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSetting = create<SettingStore>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});
