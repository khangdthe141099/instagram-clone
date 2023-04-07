import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { LOGIN_TYPE } from "@/constant";

interface User {
  detail: any;
  loginMethod: string;
}

export interface UserAction {
  handleSetUserDetail: (detail: User["detail"]) => void;
  handleSetLoginMethod: (method: User["loginMethod"]) => void;
}

const initialState: User = {
  detail: {},
  loginMethod: LOGIN_TYPE.CREDENTIALS,
};

const useUserStore = create<User & UserAction>(
  persist(
    (set) => ({
      //States
      ...initialState,

      //Actions
      handleSetUserDetail: (detail: any) => set({ detail }),
      handleSetLoginMethod: (loginMethod: string) => set({ loginMethod }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  ) as any
);

export default useUserStore;
