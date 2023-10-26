import { useEffect, useRef, useState } from "react";
import Tab from "../Tab";
import { getTypedNumber } from "@/utilities";

export default function ItemTooltip({ item, setTooltipShown }) {
  const [ modifiedTop, setModifiedTop ] = useState('50%');``
  const ref = useRef();

  // Prevents vertical half-pixels on the popup
  useEffect(() => {
    if (ref.current) {
      setModifiedTop(Math.floor(ref.current.offsetTop / 2) + 'px');
    }
  }, [ref]);

  return (
    <div
      className="tooltip"
      ref={ref}
      style={{
        transform: `translate(-50%, -${modifiedTop})`,
      }}
    >
      <Tab
        classes='right'
        onClick={() => {
          setTooltipShown(false);
        }}
      >
        Close
      </Tab>

      <h3>{item.name}</h3>

      <div>
        {item.description}
      </div>

      <hr />

      <div className="properties">
        {Object.keys(item.properties).map((propertyName) => {
          let property = item.properties[propertyName];

          if (typeof property === 'number') {
            property = getTypedNumber(property);
          }

          return <div key={propertyName}>{propertyName}: {property}</div>
        })}
      </div>
    </div>
  );
}