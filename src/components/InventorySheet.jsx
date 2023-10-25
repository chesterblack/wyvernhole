import GlobalContext, { InventoryContext } from "@/globalContext";
import { useContext, useEffect, useState } from "react";
import EquipmentDisplay from "./EquipmentDisplay";
import Button from "./Button";
import Item from "./Item";

export default function InventorySheet({ character = null }) {
  const { currentPlayer } = useContext(GlobalContext);
  const [ selectedCharacter, setSelectedCharacter ] = useState(
    character === 'player' ? currentPlayer : character
  );

  if (!selectedCharacter) {
    return (
      <div className="inventory-sheet">
        Character not found
      </div>
    )
  }

  let i = 0;

  return (
    <InventoryContext.Provider value={{
      selectedCharacter, setSelectedCharacter
    }}>
      <div className="inventory-sheet">
        <h2>Equipment</h2>
        <div className="equipment">
          <EquipmentDisplay />
        </div>
        <hr />
        <div>
          <h2>Bag</h2>
          {selectedCharacter.inventory.stored.length > 0 ? '' : <span className="empty">Empty</span>}
          {selectedCharacter.inventory.stored.map((item) => {
            if (item) {
              i++;
              return <Item key={`${item.name}-${i}`} character={selectedCharacter} item={item} />
            }
          })}
        </div>
      </div>
    </InventoryContext.Provider>
  );
}