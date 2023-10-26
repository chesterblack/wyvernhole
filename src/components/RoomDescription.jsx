import GlobalContext from "@/globalContext";
import { useContext, useEffect, useState } from "react";

export default function RoomDescription({}) {
  const { currentRoom, textSpeed, setTyping } = useContext(GlobalContext);
  const [ currentLetter, setCurrentLetter ] = useState(0);
  const [ writtenText, setWrittenText ] = useState('');

  useEffect(() => {
    console.log(currentRoom.description);
    setTyping(true);
    setWrittenText('');
    setCurrentLetter(0);
  }, [setTyping, setCurrentLetter, setWrittenText, currentRoom]);

  useEffect(() => {
    const description = currentRoom.description;
    if (currentLetter < description.length) {
      setTimeout(() => {
        setWrittenText(writtenText + description[currentLetter]);
        setCurrentLetter(currentLetter + 1);
      }, textSpeed);
    } else {
      console.log('typing done');
      setTyping(false);
    }
  },
  [
    currentLetter,
    writtenText,
    currentRoom,
    textSpeed,
    setTyping
  ]);

  return (
    <div className="room-description">
      {textSpeed === 0 ? currentRoom.description : writtenText}
    </div>
  );
}