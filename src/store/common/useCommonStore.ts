import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface Common {
  
}

export interface CommonAction {
 
}

const initialState: Common = {
   
};

const useCommonStore = create<Common & CommonAction>(
  persist(
    (set) => ({
      //States
      ...initialState,

      //Actions
    }),
    {
      name: "common-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  ) as any
);

export default useCommonStore;
