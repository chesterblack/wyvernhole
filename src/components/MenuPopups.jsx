import CharacterSheet from './CharacterSheet';
import Menu from './Menu';
import CloseButton from './CloseButton';
import { useContext } from 'react';
import GlobalContext from '@/globalContext';
import MenuButton from './MenuButton';

export default function MenuPopups() {
  const { currentPlayer } = useContext(GlobalContext);

  return (
    <>
      <Menu menuID='character-sheet'>
        <CloseButton variant='tab'>Close</CloseButton>
        <CharacterSheet character={currentPlayer} />
      </Menu>

      <Menu menuID='inventory'>
        <CloseButton variant='tab'>Close</CloseButton>
        Inventory
      </Menu>
    </>
  );
}