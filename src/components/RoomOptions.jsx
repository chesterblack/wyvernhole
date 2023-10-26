import GlobalContext from "@/globalContext";
import { useContext, useEffect, useState } from "react";
import RoomOption from "./RoomOption";

export default function RoomOptions({}) {
  const { currentRoom, typing, textSpeed } = useContext(GlobalContext);
  const [ canDisplay, setCanDisplay ] = useState(false);

  useEffect(() => {
    console.log('typing changed: ', typing.toString());
    setCanDisplay(!typing);
  }, [ typing ]);

  return (
    <>
      {canDisplay && (
        <div className="room-options">
          {currentRoom.options.map((option) => <RoomOption key={option.roomKey} option={option} />)}
        </div>
      )}
    </>
  );
}