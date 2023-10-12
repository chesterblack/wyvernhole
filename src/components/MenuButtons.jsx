import MenuButton from './MenuButton';

export default function MenuButtons() {
  return (
    <div className='menus'>
      <MenuButton id='character-sheet' label='Character' />
      <MenuButton id='inventory' label='Inventory' />
    </div>
  );
}
