import { useState, useEffect } from "react";

export const useToggle = (initValue) => {
  const [state, setState] = useState(initValue);

  const toggle = () => {
    setState(prev => !prev);
  }
  console.log("useTollle:", state);
  return [state, toggle];
}