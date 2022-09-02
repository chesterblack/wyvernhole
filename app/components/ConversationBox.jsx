import { useState, useEffect } from 'react';
import { useStatsContext } from '../contexts/stats-context';
import { typeWriter } from '../lib/main';
import { getEntry } from '../lib/contentful';

export default function ConversationBox(props) {
  const [dialoguePieces, setDialoguePieces] = useState([{}]);

  useEffect(async () => {
    let { fields } = await getEntry(props.roomID);
    setDialoguePieces(fields.dialogue);
  }, []);

  return (
    <div id="conversation">
      {(() => {
        for (let i = 0; i < dialoguePieces.length; i++) {
          if (typeof dialoguePieces[i].fields !== 'undefined') {
            let { message, speaker } = dialoguePieces[i].fields;

            speaker = speaker.fields;
            message = `${speaker.name}: ${message}`;

            return <DialogueBox text={message} color={speaker.colour} />;
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
