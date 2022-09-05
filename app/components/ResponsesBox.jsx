import { useState, useEffect } from 'react';
import { getEntry } from '../lib/contentful';
import { useDialogueContext } from '../contexts/dialogue-context';
import Button from './Buttons';

export default function ResponsesBox(props) {
  const [responses, setResponses] = useState(false);
  const { currentRoom, setCurrentRoom } = useDialogueContext();

  useEffect(async () => {
    let { fields } = await getEntry(currentRoom);
    setResponses(fields.responses);
  }, [currentRoom]);

  return (
    <>
      {(() => {
        if (responses) {
          let buttons = [];
          for (let i = 0; i < responses.length; i++) {
            if (typeof responses[i].fields !== 'undefined') {
              const { text, room } = responses[i].fields;
              buttons.push(
                <Button
                  key={`${text}-${room.sys.id}`}
                  label={text}
                  onClick={() => {
                    console.log(room.sys.id);
                    setCurrentRoom(room.sys.id);
                  }}
                />
              );
            }
          }

          return buttons;
        }
      })()}
    </>
  );
}
