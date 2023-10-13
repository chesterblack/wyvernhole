import Button from "./Button";
import ItemTooltip from "./ItemTooltip";
import { useContext, useState } from "react";
import GlobalContext from "@/globalContext";

export default function Item({ item, slot }) {
  const [ tooltipShown, setTooltipShown ] = useState(false);
  const { currentPlayer } = useContext(GlobalContext);
  const [ equipped, setEquipped ] = useState(
    Object.keys(currentPlayer.inventory.equipped).filter((key) => {
      const equippedSlot = currentPlayer.inventory.equipped[key];
      let shallReturn = false;
  
      if (equippedSlot && item) {
        if (Array.isArray(equippedSlot)) {
          equippedSlot.forEach((slot) => {
            if (slot) {
              if (slot.id === item.id) {
                shallReturn = true;
              }
            }
          });
        } else {
          if (equippedSlot.id === item.id) {
            shallReturn = true;
          }
        }
      }
  
      return shallReturn;
    }).length > 0
  );

  if (!item) {
    return <div className="item empty">Empty</div>;
  }

  return (
    <>
      {equipped && (
        <div className="item">
          <span>{item.name}</span>

          <Button
            onClick={() => {
              setEquipped(!equipped);

              if (equipped) {
                currentPlayer.inventory.unequipItem(slot);
              } else {
                currentPlayer.inventory.equipItem(slot);
              }
            }}
          >
            {equipped ? 'Unequip' : 'Equip'}
          </Button>

          <Button
            classes='info'
            onClick={() => {
              setTooltipShown(!tooltipShown);
            }}
          >
            ?
          </Button>
        </div>
      )}

      {tooltipShown && (
        <ItemTooltip setTooltipShown={setTooltipShown} item={item} equipped={equipped} slot={slot} />
      )}
    </>
  );
}