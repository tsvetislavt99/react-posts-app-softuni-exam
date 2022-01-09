import { useState, useEffect } from 'react';

const useFetch = (url, isArray = false) => {
  const [state, setState] = useState(isArray ? [] : {});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ message: '' });

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => {
        setState(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setError({ message: error });
        setIsLoading(false);
      });
  }, [url]);

  return {
    state,
    isLoading,
    error,
  };
};

export default useFetch;
