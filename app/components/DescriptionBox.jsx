import { useState, useEffect } from 'react';
import { useStatsContext } from '../contexts/stats-context';
import { getEntry } from '../lib/contentful';
import { typeWriter } from '../lib/main';

export default function DescriptionBox(props) {
  const [text, setText] = useState('');
  const { stats, textSpeed } = useStatsContext();

  useEffect(async () => {
    let { fields } = await getEntry(props.roomID);
    typeWriter(fields.description, setText, stats, textSpeed);
  }, []);

  return <div id="text">{text}</div>;
}
