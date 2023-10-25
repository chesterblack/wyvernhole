import Button from "./Button";
import ItemTooltip from "./ItemTooltip";
import { useContext, useState } from "react";
import GlobalContext, { InventoryContext } from "@/globalContext";

export default function Item({ character, item, slot }) {
  const [ tooltipShown, setTooltipShown ] = useState(false);
  const [ equipped, setEquipped ] = useState(!!slot);
  const { selectedCharacter, setSelectedCharacter } = useContext(InventoryContext);

  if (!item) {
    return <div className="item empty">Empty</div>;
  }

  return (
    <>
      <div className="item">
        <span>{item.name}</span>
        {slot ?
          <Button
            classes='info'
            onClick={() => {
              selectedCharacter.inventory.unequipItem(slot);
              setSelectedCharacter({...selectedCharacter});
            }}
          >
            U
          </Button>
          :
          <Button
            classes='info'
            onClick={() => {
              selectedCharacter.inventory.equipItem(item);
              setSelectedCharacter({...selectedCharacter});
            }}
          >
            E
          </Button>
        }

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