/**
 * This code was blindly copied from:
 *
 * https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
 */
import { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time
      // useEffect is re-called. useEffect will only be re-called
      // if value changes (see the inputs array below).
      // This is how we prevent debouncedValue from changing if value is
      // changed within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    [value],
  );

  return debouncedValue;
}
