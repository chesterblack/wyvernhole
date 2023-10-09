export default class Inventory
{
  constructor( equipped = this.equipmentSlots(), stored = [] ) {
      this.equipped = equipped;
      this.stored = stored;
  }

  equipmentSlots() {
    return {
      head: null,
      amulet: null,
      shoulders: null,
      armour: null,
      hands: {
        left: null,
        right: null,
      },
      rings: Array.from({length: 10}, () => null),
      feet: null,
    }
  }
}