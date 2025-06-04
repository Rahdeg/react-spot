import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  modalType: null, // 'profile' | 'post' | null

  openModal: (type) =>
    set({
      isOpen: true,
      modalType: type, // e.g. 'profile' or 'post'
    }),

  closeModal: () =>
    set({
      isOpen: false,
      modalType: null,
    }),
}));

export default useModalStore;
