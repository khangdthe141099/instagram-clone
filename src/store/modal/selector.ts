import useModalStore from './useModalStore'

//Actions:
export const useCreateModalAction = () => useModalStore((state) => state?.handleSetCreateModal)

//States:
export const useCreateModal = () => useModalStore((state) => state?.createModal)