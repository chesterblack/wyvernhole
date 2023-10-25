"use client"

import { useState } from 'react';
import Character from '@/Character/classes/Character.class';
import Player from '../Character/classes/Player.class';
import MenuBar from '../components/MenuBar';
import GlobalContext from '@/globalContext';
import menus from '@/data/menus';

export default function Home() {
  const [openMenu, setOpenMenu] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(new Player({
    name: 'Chester',
    race: 'human',
    level: 1,
    job: 'fighter',
  }));

  const target = new Character({
    name: 'Orc',
    race: 'orc',
    level: 1,
    job: 'fighter',
  });

  return (
    <GlobalContext.Provider value={{
      currentPlayer, setCurrentPlayer,
      openMenu, setOpenMenu,
      menus
    }}>
      <main>
        <MenuBar />
        <button onClick={() => {
          console.log(target);
          currentPlayer.meleeAttack(target);
          console.log(target);
        }}>
          Melee Attack
        </button>
      </main>
    </GlobalContext.Provider>
  )
}
