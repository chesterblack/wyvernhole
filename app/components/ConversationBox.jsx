import { useState, useEffect } from 'react';
import { useStatsContext } from '../contexts/stats-context';
import { typeWriter } from '../functions/main';

export default function ConversationBox() {
  return (
    <div id="conversation">
      <DialogueBox color="rgb(184, 215, 255)" text="" />
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
