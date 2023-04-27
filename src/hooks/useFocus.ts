import { useRef } from "react";

export const useFocus = () => {
  const inputRef = useRef<any>(null);

  function setFocus() {
    inputRef.current && inputRef.current.focus();
  }

  return { inputRef, setFocus };
};
