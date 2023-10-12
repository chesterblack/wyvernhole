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
      feet: null,
      hands: [
        {
          name: 'sword',
          description: 'A simple sword, frequently swung, infrequently sharpened.',
          properties: {
            attack: 2,
            defence: 1,
          }
        },
        null,
      ],
      rings: Array.from({length: 4}, () => null),
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