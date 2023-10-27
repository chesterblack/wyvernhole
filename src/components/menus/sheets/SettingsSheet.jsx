import GlobalContext from "@/globalContext";
import { useContext, useState } from "react";

export default function SettingsSheet({}) {
  const { textSpeed, setTextSpeed } = useContext(GlobalContext);
  const [ percentage, setPercentage ] = useState(Math.floor((textSpeed / 15) * 100));

  console.log(percentage);

  return (
    <div className="settings-sheet">
      <h2>Settings</h2>
      <div className="setting">
        <span>Text Speed: </span>
        <input
          className="text-speed-range inverted"
          type="range"
          name="text-speed"
          value={textSpeed}
          style={{
            background: `linear-gradient(to left, #606060 0%, #606060 ${percentage}%, #fff ${percentage}%, white 100%)`
          }}
          onChange={(e) => {
            setPercentage(Math.floor((e.target.value / 15) * 100));
            setTextSpeed(e.target.value);
          }}
          min={0}
          max={15}
        />
      </div>
    </div>
  );
}
