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
      hands: [
        null,
        null,
      ],
      rings: Array.from({length: 10}, () => null),
      feet: null,
    }
  }
}

/**
 * Example item
 * {
 *   name: 'sword',
 *   properties: {
 *     attack: 2,
 *     defence: 1,
 *   }
 * }
 */