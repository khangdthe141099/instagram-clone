import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface Post {
  allPost: any;
  userPost: any;
}

export interface PostAction {
  handleSetAllPost: (allPost: Post["allPost"]) => void;
  handleSetUserPost: (userPost: Post["userPost"]) => void;
}

const initialState: Post = {
  allPost: [],
  userPost: [],
};

const usePostStore = create<Post & PostAction>(
  persist(
    (set) => ({
      //States
      ...initialState,

      //Actions
      handleSetAllPost: (allPost: any) => set({ allPost }),
      handleSetUserPost: (userPost: any) => set({ userPost }),
    }),
    {
      name: "post-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  ) as any
);

export default usePostStore;
