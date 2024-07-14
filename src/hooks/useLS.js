import { useState, useEffect } from "react";

export const useLS = (key, initial_value) => {
  const [state, setState] = useState (
    () => JSON.parse(localStorage.getItem(key)) ?? initial_value,
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState]
}