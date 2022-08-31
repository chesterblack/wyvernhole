import { createContext, useContext, useState } from 'react';
import { useStatsContext } from './stats-context';
import { useInventoryContext } from './inventory-context';

const SaveContext = createContext();

export function SaveWrapper({ children }) {
  const [textSpeed, setTextSpeed] = useState(10);
  const { stats } = useStatsContext();
  const { inventory, equipped } = useInventoryContext().inventory;

  const defaultSaveCode = Buffer.from(
    JSON.stringify({
      r: 1,
      h: stats.health,
      mh: stats.maxHealth,
      g: stats.gold,
      s: textSpeed,
      d: stats.drunkenness,
      i: inventory,
      e: equipped,
    })
  ).toString('base64');

  const [saveCode, setSaveCode] = useState(defaultSaveCode);

  function saveGame() {
    const saveCode = Buffer.from(
      JSON.stringify({
        r: 1,
        h: stats.health,
        mh: stats.maxHealth,
        g: stats.gold,
        s: textSpeed,
        d: stats.drunkenness,
        i: inventory,
        e: equipped,
      })
    ).toString('base64');

    setSaveCode(saveCode);
  }

  return (
    <SaveContext.Provider
      value={{
        saveCode,
        setSaveCode,
        textSpeed,
        setTextSpeed,
        saveGame,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
}

export function useSaveContext() {
  return useContext(SaveContext);
}
