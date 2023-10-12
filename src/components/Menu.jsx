import CloseButton from './CloseButton';
import { useContext } from 'react';
import GlobalContext from '@/globalContext';
import Tab from './Tab';
import MenuTabs from './MenuTabs';

export default function MenuPopups() {
  const { menus, openMenu, setOpenMenu } = useContext(GlobalContext);

  return(
    <>
      {openMenu && (
        <div className='popup'>
          <MenuTabs />
          <CloseButton variant='tab'>Close</CloseButton>

          {menus.map((menu) => {
            if (openMenu === menu.id) {
              return menu.children;
            }
          })}
        </div>
      )}
    </>
  )
}