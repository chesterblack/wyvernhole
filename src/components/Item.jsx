import Button from "./Button";
import ItemTooltip from "./ItemTooltip";
import { useContext, useState } from "react";
import GlobalContext from "@/globalContext";

export default function Item({ character, item, slot }) {
  const [ tooltipShown, setTooltipShown ] = useState(false);
  const [ equipped, setEquipped ] = useState(!!slot);

  if (!item) {
    return <div className="item empty">Empty</div>;
  }

  return (
    <>
      <div className="item">
        <span>{item.name}</span>

        {/* <Button
          onClick={() => {
              currentPlayer.inventory.unequipItem(slot);
              currentPlayer.inventory.equipItem(slot);
          }}
        >
          {equipped ? 'Unequip' : 'Equip'}
        </Button> */}

        {slot ?
          <Button
            classes='info'
            onClick={() => {
              character.inventory.unequipItem(slot);
              setEquipped(!equipped);
            }}
          >
            U
          </Button>
          :
          <Button
            classes='info'
            onClick={() => {
              character.inventory.equipItem(item);
              setEquipped(!equipped);
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