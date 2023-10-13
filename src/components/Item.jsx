import Button from "./Button";
import ItemTooltip from "./ItemTooltip";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "@/globalContext";


export default function Item({ item, slot }) {
  const [ tooltipShown, setTooltipShown ] = useState(false);
  const { currentPlayer } = useContext(GlobalContext);
  const [ equipped, setEquipped ] = useState(
    Object.keys(currentPlayer.inventory.equipped).filter((el) => {
      return el.id === item.id;
    }
  ));

  console.log(equipped);

  if (!item) {
    return <div className="item empty">Empty</div>;
  }

  return (
    <>
      <div className="item">
        <span>{item.name}</span>

        <Button
          onClick={() => {
            currentPlayer.inventory.unequipItem(slot);
          }}
        >
          Unequip
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

      {tooltipShown && (
        <ItemTooltip setTooltipShown={setTooltipShown} item={item} equipped={equipped} slot={slot} />
      )}
    </>
  );
}