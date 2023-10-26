import { useContext, useEffect } from 'react';
import Menu from './Menu';
import MenuButtons from './MenuButtons';
import GlobalContext from '@/globalContext';

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
      <Menu />
      <MenuButtons />
    </>
  );
}
