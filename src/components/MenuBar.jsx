import { useContext, useState } from 'react';
import MenuPopups from './MenuPopups';
import MenuButtons from './MenuButtons';
import GlobalContext from '@/globalContext';

export default function MenuBar({}) {
  return (
    <>
      <MenuPopups />
      <MenuButtons />
    </>
  );
}
