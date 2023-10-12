import GlobalContext from "@/globalContext";
import { useContext } from "react";
import EquipmentDisplay from "./EquipmentDisplay";

export default function InventorySheet({ character = null }) {
  const { currentPlayer } = useContext(GlobalContext);

  if (!character) {
    return (
      <div className="inventory-sheet">
        Character not found
      </div>
    )
  }

  character = character === 'player' ? currentPlayer : character;

  const { equipment, bag } = character;

  return (
    <div className="inventory-sheet">
      <h2>Equipment</h2>
      <div className="equipment">
        <EquipmentDisplay equipment={equipment} />
      </div>
      <hr />
      <div>
        <h2>Bag</h2>
        {bag.length > 0 ? '' : <span className="empty">Empty</span>}
        {bag.map((item) => {
          return item?.name;
        })}
      </div>
    </div>
  );
}