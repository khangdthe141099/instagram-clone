import react, { useState, useEffect } from 'react';

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<any>();

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debouncedValue;
}

export default useDebounce