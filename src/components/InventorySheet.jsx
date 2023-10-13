import GlobalContext from "@/globalContext";
import { useContext, useEffect, useState } from "react";
import EquipmentDisplay from "./EquipmentDisplay";
import Button from "./Button";

export default function InventorySheet({ character = null }) {
  const { currentPlayer } = useContext(GlobalContext);
  character = character === 'player' ? currentPlayer : character;

  if (!character) {
    return (
      <div className="inventory-sheet">
        Character not found
      </div>
    )
  }


  const { equipment } = character;

  return (
    <div className="inventory-sheet">
      <h2>Equipment</h2>
      <div className="equipment">
        <EquipmentDisplay equipment={equipment} />
      </div>
      <hr />
      <div>
        <h2>Bag</h2>
        {character.inventory.stored.length > 0 ? '' : <span className="empty">Empty</span>}
        {character.inventory.stored.map((item) => {
          return item?.name;
        })}
        <Button onClick={() => {console.log(character.inventory.stored)}}>bag check</Button>
      </div>
    </div>
  );
}