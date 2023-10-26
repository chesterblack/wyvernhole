import GlobalContext from "@/globalContext";
import { useContext } from "react";
import RoomDescription from "./RoomDescription";
import RoomOptions from "./RoomOptions";

export default function Room({}) {
  const { currentRoom, typing } = useContext(GlobalContext);

  return (
    <>
      {`typing: ${typing.toString()}`}
      <RoomDescription />
      <RoomOptions />
    </>
  );
}