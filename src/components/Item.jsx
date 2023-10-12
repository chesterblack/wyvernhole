import { useState } from "react";
import Button from "./Button";
import ItemTooltip from "./ItemTooltip";

export default function Item({ item }) {
  const [ tooltipShown, setTooltipShown ] = useState(false);

  if (!item) {
    return <div className="item empty">Empty</div>;
  }

  return (
    <>
      <div className="item">
        <span>{item.name}</span>
        <Button
          classes='info'
          onClick={() => {
            setTooltipShown(!tooltipShown);
          }}
        >
          {tooltipShown ? 'X' : '?'}
        </Button>
      </div>

      {tooltipShown && (
        <ItemTooltip setTooltipShown={setTooltipShown} item={item} />
      )}
    </>
  );
}