import { createContext, useContext, useState } from 'react';

const StatsContext = createContext();

export function StatsWrapper({ children }) {
  const [stats, setStats] = useState({
    health: 100,
    maxHealth: 100,
    gold: 50,
    drunkenness: 0,
    attack: 0,
    defence: 0,
  });

  const [textSpeed, setTextSpeed] = useState(10);

  const statsChangeHandler = (key, value) => {
    setStats((prevStats) => {
      return { ...prevStats, [key]: value };
    });
  };

  return (
    <StatsContext.Provider
      value={{ stats, setStats, statsChangeHandler, textSpeed, setTextSpeed }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export function useStatsContext() {
  return useContext(StatsContext);
}
