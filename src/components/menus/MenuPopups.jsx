import CloseButton from './CloseButton';
import { useContext, useEffect, useRef, useState } from 'react';
import GlobalContext from '@/globalContext';
import MenuTabs from './MenuTabs';

export default function MenuPopups() {
  const { menus, openMenu } = useContext(GlobalContext);
  const [ modifiedTop, setModifiedTop ] = useState(0);
  const ref = useRef();

  // Prevents vertical half-pixels on the popup
  useEffect(() => {
    if (ref.current) {
      setModifiedTop(Math.floor(ref.current.offsetTop / 2));
    }
  }, [ref, openMenu]);

  return(
    <>
      {openMenu && (
        <div
          className='popup'
          ref={ref}
          style={{
            transform: `translate(-50%, -${modifiedTop}px)`,
          }}
        >
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