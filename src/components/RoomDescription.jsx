import GlobalContext from "@/globalContext";
import { useContext, useEffect, useState } from "react";

export default function RoomDescription({}) {
  const { currentRoom, textSpeed, setTyping } = useContext(GlobalContext);
  const [ currentLetter, setCurrentLetter ] = useState(0);
  const [ writtenText, setWrittenText ] = useState('');

  useEffect(() => {
    if (currentLetter < currentRoom.description.length) {
      const typewriter = setTimeout(() => {
        setTyping(true);
        setWrittenText(writtenText + currentRoom.description[currentLetter]);
        setCurrentLetter(currentLetter + 1);
      }, textSpeed);

      return () => clearTimeout(typewriter);
    } else {
      setTyping(false);
    }
  }, [
    currentLetter,
    writtenText,
    currentRoom,
    setTyping,
    textSpeed,
  ]);

  useEffect(() => {
    setWrittenText('');
    setCurrentLetter(0);
  }, [setTyping, setCurrentLetter, setWrittenText, currentRoom]);
    
  return (
    <div className="room-description">
      {textSpeed === 0 ? currentRoom.description : writtenText}
    </div>
  );
}