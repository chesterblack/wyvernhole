"use client"

import { useState } from 'react';
import Button from './Button';
import CharacterSheet from './CharacterSheet';
import Menu from './Menu';
import Tab from './Tab';

export default function Menus({ currentPlayer }) {
  const [ openMenus, setOpenMenus ] = useState([]);

  return (
    <>
      <Menu
        open={openMenus.includes('character-sheet')}
        menuID='character-sheet'
      >
        <Tab onClick={() => {
          toggleMenu( openMenus, setOpenMenus, 'character-sheet' );
        }}>
          X
        </Tab>
        <CharacterSheet character={currentPlayer} />
      </Menu>

      <Button
        onClick={() => {
          toggleMenu( openMenus, setOpenMenus, 'character-sheet' );
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
    newList.push(menu);
  }

  setOpenMenus(newList);
}