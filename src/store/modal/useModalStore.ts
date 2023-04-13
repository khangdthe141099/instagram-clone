import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface Modal {
  createModal: any;
}

export interface ModalAction {
  handleSetCreateModal: (value: Modal["createModal"]) => void;
}

const initialState: Modal = {
    createModal: {}
};

const useModalStore = create<Modal & ModalAction>(
  persist(
    (set) => ({
      //States
      ...initialState,

      //Actions
      handleSetCreateModal: (value: any) => set({ createModal: value }),
    }),
    {
      name: "modal-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  ) as any
);

export default useModalStore;
