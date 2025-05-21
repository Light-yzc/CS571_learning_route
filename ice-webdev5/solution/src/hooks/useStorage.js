
import { useState, useEffect } from 'react';

export default function useStorage(storageKey, initialValue) {

  const savedData = JSON.parse(sessionStorage.getItem(storageKey));

  const [data, setData] = useState(savedData ? savedData : initialValue);

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(data));
  }, [data]);

  return [data, setData];
}