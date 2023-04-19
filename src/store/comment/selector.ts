import useCommentStore from './useCommentStore'

//Actions:
export const useAllCommentAction = () => useCommentStore((state) => state?.handleSetAllComment)

//States:
export const useAllComment = () => useCommentStore((state) => state?.allComment)