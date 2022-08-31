import { useState, useEffect } from 'react';
import { useDialogueContext } from '../contexts/dialogue-context';
import { useStatsContext } from '../contexts/stats-context';
import { typeWriter } from '../functions/main';

export default function ConversationBox() {
  return (
    <div id="conversation">
      <DialogueBox
        color="rgb(184, 215, 255)"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat ut illo sapiente sint, voluptatem ratione magnam. Eius aspernatur saepe, tempora dolores porro, atque eveniet quasi at doloribus hic exercitationem."
      />
    </div>
  );
}

export function DialogueBox(props) {
  const [text, setText] = useState('');
  const { stats, textSpeed } = useStatsContext();
  const { displayPhase, setDisplayPhase } = useDialogueContext();

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
