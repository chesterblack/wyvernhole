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
          id: 1,
          name: 'sword',
          description: 'A simple sword, frequently swung, infrequently sharpened.',
          properties: {
            equipable: true,
            attack: 2,
            defence: 1,
          }
        },
        null,
      ],
      rings: Array.from({length: 4}, () => null),
    }
  }

  unequipItem(slot) {
    console.log(slot);

    console.log(this.equipped);
    console.log(this.stored);

    let item;
    if (Array.isArray(slot)) {
      item = this.equipped[slot[0]][slot[1]];
      this.equipped[slot[0]][slot[1]] = null;
    } else {
      item = this.equipped[slot];
      this.equipped[slot] = null;
    }

    this.stored.push(item);

    console.log(this.equipped);
    console.log(this.stored);
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