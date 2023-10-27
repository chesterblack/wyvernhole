import CogIcon from "@/components/icons/CogIcon";
import CharacterSheet from "@/components/menus/sheets/CharacterSheet";
import InventorySheet from "@/components/menus/sheets/InventorySheet";
import SettingsSheet from "@/components/menus/sheets/SettingsSheet";
import StatSheet from "@/components/menus/sheets/StatSheet";

const menus = [
  {
    id: 'settings',
    tab: <CogIcon />,
    label: 'Settings',
    children: <SettingsSheet />,
  },
  {
    id: 'character-sheet',
    tab: 'Character',
    label: 'Character',
    children: <CharacterSheet key="character-sheet" character='player' />,
  },
  {
    id: 'inventory',
    tab: 'Inventory',
    label: 'Inventory',
    children: <InventorySheet key="inventory-sheet" character='player' />,
  },
  {
    id: 'stats',
    tab: 'Stats',
    label: 'Stats',
    children: <StatSheet key="stat-sheet" character='player' />,
  },
];

export default menus;