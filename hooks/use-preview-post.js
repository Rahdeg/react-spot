import { create } from "zustand";

const usePreviewStore = create((set) => ({
  isOpen: false,
  data: null,

  openModal: (data = null) => set({ isOpen: true, data }),
  closeModal: () => set({ isOpen: false, data: null }),
}));

export default usePreviewStore;
