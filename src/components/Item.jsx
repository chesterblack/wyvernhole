import Button from "./Button";
import ItemTooltip from "./ItemTooltip";
import { useContext, useState } from "react";
import GlobalContext, { InventoryContext } from "@/globalContext";

export default function Item({ item, slot }) {
  const [ tooltipShown, setTooltipShown ] = useState(false);
  const { selectedCharacter, setSelectedCharacter } = useContext(InventoryContext);

  if (!item) {
    return <div className="item empty">Empty</div>;
  }

  return (
    <>
      <div className="item">
        <span
          className="item-name"
          onClick={() => {
            if (slot) {
              selectedCharacter.inventory.unequipItem(slot);
            } else {
              selectedCharacter.inventory.equipItem(item);
            }

            setSelectedCharacter({...selectedCharacter});
          }}
        >
          {item.name}
        </span>

        <Button
          classes='info'
          onClick={() => {
            setTooltipShown(!tooltipShown);
          }}
        >
          ?
        </Button>
      </div>

      {tooltipShown && (
        <ItemTooltip setTooltipShown={setTooltipShown} item={item} slot={slot} />
      )}
    </>
  );
}