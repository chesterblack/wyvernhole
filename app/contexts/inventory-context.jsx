import { createContext, useContext, useState } from 'react';

const InventoryContext = createContext();

export function InventoryWrapper({ children }) {
  const [inventory, setInventory] = useState([]);
  const [equipped, setEquipped] = useState({
    hands: [null, null],
    armour: null,
    boots: null,
    gloves: null,
    head: null,
    rings: [null, null, null, null],
    amulet: null,
  });

  const equippedChangeHandler = (key, value) => {
    setEquipped((prevEquipped) => {
      return { ...prevEquipped, [key]: value };
    });
  };

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        setInventory,
        equipped,
        equippedChangeHandler,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventoryContext() {
  return useContext(InventoryContext);
}
