"use client"

import { useEffect, useState } from 'react';
import Button from './Button';
import CharacterSheet from './CharacterSheet';
import Menu from './Menu';

export default function Menus({ currentPlayer }) {
  const [ openMenus, setOpenMenus ] = useState([]);

  return (
    <>
    <Menu open={openMenus.includes('character-sheet')}>
      <CharacterSheet character={currentPlayer} />
    </Menu>

      <Button
        onClick={() => {
          toggleMenu( openMenus, setOpenMenus, 'character-sheet' );
          console.log(openMenus);
        }}
      >
        Character Sheet
      </Button>
    </>
  );
}

function toggleMenu( openMenus, setOpenMenus, menu ) {
  const originalList = openMenus;

  const newList = openMenus.filter((test) => {
    return test !== menu;
  });

  if (originalList.length === newList.length) {
    console.log('adding');
    newList.push(menu);
  }

  setOpenMenus(newList);
}