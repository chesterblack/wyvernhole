import CharacterSheet from "@/components/CharacterSheet";

const menus = [
  {
    id: 'character-sheet',
    label: 'Character',
    children: <CharacterSheet key="character-sheet" character='player' />,
  },
  {
    id: 'inventory',
    label: 'Inventory',
    children: 'Inventory menu',
  },
];

export default menus;