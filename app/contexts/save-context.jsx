import { createContext, useContext, useState } from 'react';
import { useStatsContext } from './stats-context';
import { useInventoryContext } from './inventory-context';

const SaveContext = createContext();

export function SaveWrapper({ children }) {
  const { stats, textSpeed, setTextSpeed } = useStatsContext();
  const { inventory, equipped } = useInventoryContext().inventory;

  const defaultRoom = '5AGoh0HPQ7D2H4aziodOKL';

  const saveCodeObj = {
    r: defaultRoom,
    h: stats.health,
    mh: stats.maxHealth,
    g: stats.gold,
    s: textSpeed,
    d: stats.drunkenness,
    i: inventory,
    e: equipped,
  };

  const defaultSaveCode = Buffer.from(JSON.stringify(saveCodeObj)).toString(
    'base64'
  );

  const [saveCode, setSaveCode] = useState(defaultSaveCode);

  function saveGame() {
    const saveCode = Buffer.from(
      JSON.stringify({
        r: saveCode.r,
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
        saveCodeObj,
        saveCode,
        setSaveCode,
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
