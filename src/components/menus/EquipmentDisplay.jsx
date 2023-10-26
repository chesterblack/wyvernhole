import { useContext } from "react";
import EquipmentSlotDisplay from "./EquipmentSlotDisplay";
import { InventoryContext } from "@/globalContext";

export default function EquipmentDisplay({}) {
  const { selectedCharacter } = useContext(InventoryContext);
  const equipment = selectedCharacter.inventory.equipped;

  return (
    <>
      {Object.keys(equipment).map((slot) => {
        const inSlot = equipment[slot];
        return (
          <EquipmentSlotDisplay
            key={slot}
            slot={slot}
            inSlot={inSlot}
          />
        );
      })}
    </>
  )
}