import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface Comment {
  allComment: any;
}

export interface CommentAction {
  handleSetAllComment: (allComment: Comment["allComment"]) => void;
}

const initialState: Comment = {
    allComment: []
};

const useCommentStore = create<Comment & CommentAction>(
  persist(
    (set) => ({
      //States
      ...initialState,

      //Actions
      handleSetAllComment: (allComment: any) => set({ allComment }),
    }),
    {
      name: "comment-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  ) as any
);

export default useCommentStore;
