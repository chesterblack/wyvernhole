import GlobalContext from "@/globalContext";
import { useContext, useEffect, useState } from "react";
import RoomOption from "./RoomOption";

export default function RoomOptions({}) {
  const { currentRoom, typing, textSpeed } = useContext(GlobalContext);
  const [ canDisplay, setCanDisplay ] = useState(false);

  useEffect(() => {
    setCanDisplay(!typing);
  }, [ typing ]);

  return (
    <>
      {canDisplay && (
        <div className="room-options">
          {currentRoom.options.map((option) => {
            return (
              <RoomOption
                key={option.roomKey}
                option={option}
                setCanDisplay={setCanDisplay}
              />
            );
          })}
        </div>
      )}
    </>
  );
}