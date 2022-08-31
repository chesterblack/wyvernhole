import { createContext, useContext, useState } from 'react';

const DialogueContext = createContext();

export default function DialogueWrapper({ children }) {
  const [displayPhase, setDisplayPhase] = useState('description');

  return (
    <DialogueContext.Provider
      value={{
        displayPhase,
        setDisplayPhase,
      }}
    >
      {children}
    </DialogueContext.Provider>
  );
}

export function useDialogueContext() {
  return useContext(DialogueContext);
}
