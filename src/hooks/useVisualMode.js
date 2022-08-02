// useVisualMode uses the initial state and makes a copy, the copy serves the purpose of making it mutable without changing the initial values. it is important so it does not change the component hierarchy 

import { useState } from "react";
const useVisualMode = (initial) => {
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setHistory(prev => [...(replace ? prev.slice(0, -1) : prev), newMode]);
  }

  function back() {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, -1)]);
    }
  }

  return { mode:history[history.length-1] , transition, back };
};

export default useVisualMode;
