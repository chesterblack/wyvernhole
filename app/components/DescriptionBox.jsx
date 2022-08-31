import { useState, useEffect } from 'react';
import { useStatsContext } from '../contexts/stats-context';
import { typeWriter } from '../functions/main';

export default function DescriptionBox(props) {
  const [text, setText] = useState('click');
  const { stats, textSpeed } = useStatsContext();

  let textToType = props.text ?? '';

  useEffect(() => {
    typeWriter(textToType, setText, stats, textSpeed);
  }, []);

  return <div id="text">{text}</div>;
}
