import useUserStore from './useUserStore'

//Actions:
export const useUserAction = () => useUserStore((state) => state?.handleSetUserDetail)
export const useLoginMethodAction = () =>  useUserStore((state) => state?.handleSetLoginMethod)

//States:
export const useUserDetail = () => useUserStore((state) => state?.detail)
export const useLoginMethod = () => useUserStore((state) => state?.loginMethod)