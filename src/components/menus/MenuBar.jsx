import { useContext, useEffect } from 'react';
import MenuButtons from './MenuButtons';
import GlobalContext from '@/globalContext';
import MenuPopups from './MenuPopups';

export default function MenuBar({}) {
  const { setOpenMenu } = useContext(GlobalContext);
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setOpenMenu(false);
      }
    })
  }, [setOpenMenu]);

  return (
    <>
      <MenuPopups />
      <MenuButtons />
    </>
  );
}
