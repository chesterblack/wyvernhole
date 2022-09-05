import { useState, useEffect } from 'react';
import { useStatsContext } from '../contexts/stats-context';
import { useDialogueContext } from '../contexts/dialogue-context';
import { typeWriter } from '../lib/main';
import { getEntry } from '../lib/contentful';

export default function ConversationBox(props) {
  const [dialoguePieces, setDialoguePieces] = useState(false);
  const { currentRoom } = useDialogueContext();

  useEffect(async () => {
    let { fields } = await getEntry(currentRoom);
    setDialoguePieces(fields.dialogue);
  }, [currentRoom]);

  return (
    <div id="conversation">
      {(() => {
        if (dialoguePieces) {
          for (let i = 0; i < dialoguePieces.length; i++) {
            if (typeof dialoguePieces[i].fields !== 'undefined') {
              let { message, speaker } = dialoguePieces[i].fields;

              speaker = speaker.fields;
              message = `${speaker.name}: ${message}`;

              return (
                <DialogueBox
                  key={message}
                  text={message}
                  color={speaker.colour}
                />
              );
            }
          }
        }
      })()}
    </div>
  );
}

export function DialogueBox(props) {
  const [text, setText] = useState('');
  const { stats, textSpeed } = useStatsContext();

  let textToType = props.text ?? '';

  useEffect(() => {
    typeWriter(textToType, setText, stats, textSpeed);
  }, []);

  return (
    <span className="speaker" style={{ color: props.color }}>
      {text}
    </span>
  );
}
