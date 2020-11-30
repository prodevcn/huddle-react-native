import { useEffect, useState, useRef } from 'react';

export default (onPress, duration = 350) => {
  const [disable, setDisable] = useState(false);
  const handler = useRef(null);
  const handlePress = (...args) => {
    if (disable) return;
    setDisable(true);
    onPress(...args);
    handler.current = setTimeout(() => {
      setDisable(false);
    }, duration);
  };

  useEffect(() => () => {
    clearTimeout(handler.current);
  }, []);

  return handlePress;
};
