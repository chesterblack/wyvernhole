import { useContext, useEffect, useRef, useState } from "react";
import Tab from "./Tab";
import { getTypedMod } from "@/utilities";
import Button from "./Button";
import GlobalContext from "@/globalContext";

export default function ItemTooltip({ item, setTooltipShown, equipped, slot }) {
  const [ modifiedTop, setModifiedTop ] = useState('50%');
  const [ itemEquipped, setItemEquipped ] = useState(equipped);
  const { currentPlayer } = useContext(GlobalContext);
  const ref = useRef();

  // Prevents vertical half-pixels on the popup
  useEffect(() => {
    if (ref.current) {
      setModifiedTop(Math.floor(ref.current.offsetTop / 2) + 'px');
    }
  }, [ref]);

  return (
    <div
      className="item-tooltip"
      ref={ref}
      style={{
        transform: `translate(-50%, -${modifiedTop})`,
      }}
    >
      <h3>{item.name}</h3>

      <div>
        {item.description}
      </div>

      <Tab
        classes='right'
        onClick={() => {
          setTooltipShown(false);
        }}
      >
        Close
      </Tab>

      <hr />

      <div className="properties">
        {Object.keys(item.properties).map((propertyName) => {
          let property = item.properties[propertyName];

          if (typeof property === 'number') {
            property = getTypedMod(property);
          }

          return <div key={propertyName}>{propertyName} {property}</div>
        })}

        {item.properties.equipable && (
          <Button
            onClick={() => {
              setItemEquipped(!itemEquipped);

              if (itemEquipped) {
                const equippedSlot = Array.isArray(slot) ? slot[0][slot[1]] : slot;
                currentPlayer.inventory.unequipItem(equippedSlot);
                console.log(currentPlayer.inventory);
              }
            }}
          >
            {itemEquipped ? 'Unequip' : 'Equip'}
          </Button>
        )}
      </div>
    </div>
  );
}