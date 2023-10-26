import CharacterSheet from "@/components/menus/sheets/CharacterSheet";
import InventorySheet from "@/components/menus/sheets/InventorySheet";
import StatSheet from "@/components/menus/sheets/StatSheet";

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
  {
    id: 'stats',
    label: 'Stats',
    children: <StatSheet key="stat-sheet" character='player' />,
  }
];

export default menus;