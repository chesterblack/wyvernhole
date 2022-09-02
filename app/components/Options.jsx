import Button, { AutosaveToggle } from './Buttons';
import { useSaveContext } from '../contexts/save-context';
import { useStatsContext } from '../contexts/stats-context';
import { pingUpdateMessage } from '../lib/main';

export default function OptionsMenu(props) {
  return (
    <>
      <TextSpeed />
      <SaveGame />
      <LoadGame />
      {/* <Button label='New Game' onClick={() => {
              console.log('new game!');
          }} /> */}
      <AutosaveToggle />
    </>
  );
}

function TextSpeed() {
  const { textSpeed, setTextSpeed } = useStatsContext();

  return (
    <div>
      Text Speed:
      <input
        type="number"
        id="text-speed"
        defaultValue={textSpeed}
        onChange={(e) => {
          setTextSpeed(e.target.value);
        }}
      />
    </div>
  );
}

function SaveGame() {
  const { saveCode } = useSaveContext();

  return (
    <div>
      Save game:
      <input id="save-game" type="text" readOnly={true} value={saveCode} />
      <Button
        label="Copy"
        onClick={(e) => {
          navigator.clipboard.writeText(saveCode);
          pingUpdateMessage(e.target, 'Copied to clipboard');
        }}
      />
    </div>
  );
}

function LoadGame() {
  const { statsChangeHandler } = useStatsContext();
  const { saveGame } = useSaveContext();

  function loadGame(code) {
    let decodedOptions = JSON.parse(atob(code));
    const { h, mh, g, d } = decodedOptions;
    const stats = {
      health: h,
      maxHealth: mh,
      gold: g,
      drunkenness: d,
    };

    for (const key in stats) {
      const value = stats[key];
      statsChangeHandler(key, value);
    }

    saveGame();
  }

  return (
    <div>
      Load game:
      <input id="load-game" type="text" />
      <Button
        label="Load"
        onClick={() => {
          let loadCode = document.querySelector('#load-game').value;
          loadGame(loadCode);
        }}
      />
    </div>
  );
}
