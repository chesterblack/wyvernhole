import { useState } from 'react';
import { useStatsContext } from '../contexts/stats-context';
import { typeWriter } from '../functions/main';

export default function TextBox() {
  const [text, setText] = useState('click');
  const { stats, textSpeed } = useStatsContext();

  return (
    <div
      id="text"
      onClick={() => {
        typeWriter(
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, incidunt est ipsum perspiciatis culpa similique numquam, velit non illo vero nisi natus omnis aspernatur consectetur beatae possimus repellat architecto impedit.',
          setText,
          stats,
          textSpeed
        );
      }}
    >
      {text}
    </div>
  );
}
