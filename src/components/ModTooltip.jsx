import { useEffect, useRef, useState } from "react";
import Tab from "./Tab";
import { getTypedNumber } from "@/utilities";

export default function ModTooltip({ title, mod, setTooltipShown }) {
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

      <h3>{title}</h3>

      <div className="properties">
        {Object.keys(mod).map((modType) => {
          if (modType !== 'total') {
            return (
              <div key={modType}>
                {modType}: {getTypedNumber(mod[modType])}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}