import Player from '../Character/classes/Player.class';
import Button from '../components/Button';
import CharacterSheet from '../components/CharacterSheet';
import Menus from '../components/Menus';

export default function Home() {
  const currentPlayer = new Player({
    name: 'Chester',
    race: 'human',
    level: 195,
    job: 'fighter',
  });

  console.log(currentPlayer);

  return (
    <main>
      <Menus currentPlayer={currentPlayer} />
    </main>
  )
}
