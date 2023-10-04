import { useState, useEffect } from 'react';
const useLoading = (duration) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, duration);
  }, [duration]);

  return loading;
};

export default useLoading;
