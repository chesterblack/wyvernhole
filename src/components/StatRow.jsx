import { getTypedNumber } from "@/utilities";
import Button from "./Button";
import ModTooltip from "./ModTooltip";
import { useState } from "react";

export default function StatRow({ stat }) {
  const [ tooltipShown, setTooltipShown ] = useState(false);

  return (
    <div className="stat">
      {stat.title}: {getTypedNumber(stat.total)}
      <Button
        classes='info'
        onClick={() => {
          setTooltipShown(!tooltipShown);
        }}
      >
        ?
      </Button>
      {tooltipShown && (
        <ModTooltip title='Melee Attack Modifier' setTooltipShown={setTooltipShown} mod={stat} />
      )}
    </div>
  );
}