import { createContext, useContext, useState } from 'react';
import { useStatsContext } from './stats-context';
import { useInventoryContext } from './inventory-context';

const SaveContext = createContext();

export function saveGame() {
    const { textSpeed, setSaveCode } = useSaveContext();
    const { stats } = useStatsContext();
    const { inventory, equipped } = useInventoryContext().inventory;

    const saveCode = btoa(JSON.stringify({
        r: 1,
        h: stats.health,
        mh: stats.maxHealth,
        g: stats.gold,
        s: textSpeed,
        d: stats.drunkenness,
        i: inventory,
        e: equipped,
    }));

    setSaveCode(saveCode);
}

export function SaveWrapper({ children }) {
    const [textSpeed, setTextSpeed] = useState(10);
    const { stats } = useStatsContext();
    const { inventory, equipped } = useInventoryContext().inventory;

    const defaultSaveCode = btoa(JSON.stringify({
        r: 1,
        h: stats.health,
        mh: stats.maxHealth,
        g: stats.gold,
        s: textSpeed,
        d: stats.drunkenness,
        i: inventory,
        e: equipped,
    }));

    const [saveCode, setSaveCode] = useState(defaultSaveCode);

    return (
        <SaveContext.Provider
            value={{
                saveCode,
                setSaveCode,
                textSpeed,
                setTextSpeed,
            }}
        >
            {children}
        </SaveContext.Provider>
    )
}

export function useSaveContext() {
    return useContext(SaveContext);
}