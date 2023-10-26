import { useContext } from "react";
import Button from "./Button";
import GlobalContext from "@/globalContext";
import rooms from "@/data/rooms";

export default function RoomOption({ option, setCanDisplay }) {
  const { setCurrentRoom, setTyping } = useContext(GlobalContext);

  return (
   <Button
    onClick={() => {
      setCanDisplay(false);
      setCurrentRoom({...rooms[option.roomKey]});
    }}
   >
      {option.text}
    </Button>
  );
}