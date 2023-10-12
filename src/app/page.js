"use client"

import { useState } from 'react';
import Player from '../Character/classes/Player.class';
import MenuBar from '../components/MenuBar';
import GlobalContext from '@/globalContext';
import menus from '@/Character/data/menus';

export default function Home() {
  const [openMenu, setOpenMenu] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(new Player({
    name: 'Chester',
    race: 'elf',
    level: 1,
    job: 'fighter',
  }));

  return (
    <GlobalContext.Provider value={{
      currentPlayer, setCurrentPlayer,
      openMenu, setOpenMenu,
      menus
    }}>
      <main>
        <MenuBar />
      </main>
    </GlobalContext.Provider>
  )
}
