import usePostStore from './usePostStore'

//Actions:
export const useAllPostAction = () => usePostStore((state) => state?.handleSetAllPost)
export const useUserPostAction = () =>  usePostStore((state) => state?.handleSetUserPost)

//States:
export const useAllPost = () => usePostStore((state) => state?.allPost)
export const useUserPost = () => usePostStore((state) => state?.userPost)