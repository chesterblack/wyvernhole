import { useContext } from "react";
import Button from "./Button";
import GlobalContext from "@/globalContext";
import rooms from "@/data/rooms";

export default function RoomOption({ option }) {
  const { setCurrentRoom } = useContext(GlobalContext);

  return (
   <Button
    onClick={() => {
      setCurrentRoom({...rooms[option.roomKey]});
    }}
   >
      {option.text}
    </Button>
  );
}