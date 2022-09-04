import { createContext, useContext, useState } from 'react';
import { startingRoom } from '../constants/vars';

const DialogueContext = createContext();

export function DialogueWrapper({ children }) {
  const [currentRoom, setCurrentRoom] = useState(startingRoom);

  return (
    <DialogueContext.Provider
      value={{
        currentRoom,
        setCurrentRoom,
      }}
    >
      {children}
    </DialogueContext.Provider>
  );
}

export function useDialogueContext() {
  return useContext(DialogueContext);
}
