import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setMode(newMode);
      let newHistory = [...history]
      newHistory.push(newMode)
      setHistory(newHistory)
    } else {
      setMode(newMode);
    }
  };

  const back = () => {
    if (history.length > 1) {
      let newHistory = [...history]
      newHistory.pop();
      setHistory(newHistory)
      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;
