import { useContext } from 'react';
import MenuButton from './MenuButton';
import GlobalContext from '@/globalContext';

export default function MenuButtons() {
  const { menus } = useContext(GlobalContext);

  return (
    <div className='menus'>
      {menus.map((menu) => {
        return (
          <MenuButton key={menu.id} id={menu.id} label={menu.label} />
        )
      })}
    </div>
  );
}
