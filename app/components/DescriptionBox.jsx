import { useState, useEffect } from 'react';
import { useDialogueContext } from '../contexts/dialogue-context';
import { useStatsContext } from '../contexts/stats-context';
import { getEntry } from '../lib/contentful';
import { typeWriter } from '../lib/main';

export default function DescriptionBox(props) {
  const [text, setText] = useState('');
  const { stats, textSpeed } = useStatsContext();
  const { currentRoom } = useDialogueContext();

  useEffect(async () => {
    let { fields } = await getEntry(currentRoom);
    setText(fields.description);
    typeWriter(fields.description, setText, stats, textSpeed);
  }, [currentRoom]);

  return <div id="text">{text}</div>;
}
