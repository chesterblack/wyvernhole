"use client"

import GlobalContext from '@/globalContext';
import Player from '../Character/classes/Player.class';
import MenuBar from '../components/MenuBar';
import { useState } from 'react';

export default function Home() {
  const [openMenu, setOpenMenu] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(new Player({
    name: 'Chester',
    race: 'human',
    level: 1,
    job: 'fighter',
  }));

  return (
    <GlobalContext.Provider value={{
      currentPlayer, setCurrentPlayer,
      openMenu, setOpenMenu
    }}>
      <main>
        <MenuBar />
      </main>
    </GlobalContext.Provider>
  )
}
