import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export const useModal = (
  defaultState = false,
): {
  open: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onToggleModal: () => void;
} => {
  const [open, setOpen] = useState(defaultState);

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setOpen(false);
  }, []);
  const onToggleModal = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return {
    open,
    onOpenModal,
    onCloseModal,
    setOpen,
    onToggleModal,
  };
};
