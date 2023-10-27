"use client"

import { useState } from 'react';
import Character from '@/character/classes/Character.class';
import Player from '@/character/classes/Player.class';
import MenuBar from '@/components/menus/MenuBar';
import GlobalContext from '@/globalContext';
import menus from '@/data/menus';
import rooms from '@/data/rooms';
import Room from '@/components/Room';

export default function Home() {
  const [ openMenu, setOpenMenu ] = useState(null);
  const [ currentPlayer, setCurrentPlayer ] = useState(new Player({ name: 'Chester' }));
  const [ currentRoom, setCurrentRoom ] = useState(rooms[0]);
  const [ typing, setTyping ] = useState(true);
  const [ textSpeed, setTextSpeed ] = useState(7);

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
      currentRoom, setCurrentRoom,
      typing, setTyping,
      textSpeed, setTextSpeed,
      menus,
    }}>
      <main>
        <MenuBar />
        <Room />
      </main>
    </GlobalContext.Provider>
  )
}
