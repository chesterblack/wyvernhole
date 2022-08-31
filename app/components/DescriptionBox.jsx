import { useState, useEffect, useContext } from 'react';
import { useDialogueContext } from '../contexts/dialogue-context';
import { useStatsContext } from '../contexts/stats-context';
import { typeWriter } from '../functions/main';

export default function DescriptionBox(props) {
  const [text, setText] = useState('');
  const { stats, textSpeed } = useStatsContext();
  const { displayPhase, setDisplayPhase } = useDialogueContext();

  let textToType = props.text ?? '';

  useEffect(() => {
    typeWriter(textToType, setText, stats, textSpeed);
  }, []);

  return <div id="text">{text}</div>;
}
