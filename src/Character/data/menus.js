import CharacterSheet from "@/components/CharacterSheet";
import InventorySheet from "@/components/InventorySheet";

const menus = [
  {
    id: 'character-sheet',
    label: 'Character',
    children: <CharacterSheet key="character-sheet" character='player' />,
  },
  {
    id: 'inventory',
    label: 'Inventory',
    children: <InventorySheet key="inventory-sheet" character='player' />,
  },
];

export default menus;