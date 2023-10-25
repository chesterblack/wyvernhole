import items from "@/data/items";

export default class Inventory
{
  constructor( parent, equipped = this.equipmentSlots(), stored = [] ) {
    this.parent = parent;
    this.equipped = equipped ?? this.equipmentSlots();
    this.stored = stored ?? [];
  }

  equipmentSlots() {
    return {
      head: [ null ],
      amulet: [ null ],
      shoulders: [ null ],
      armour: [ null ],
      feet: [ null ],
      hands: [
        null,
        null,
      ],
      rings: Array.from({length: 4}, () => null),
    }
  }

  equipItem(item) {
    if (!item.slot) {
      throw('Item has no slot assigned');
    }

    let exists = false;
    for (let i = 0; i < this.stored.length; i++) {
      const element = this.stored[i];

      if (element.id === item.id) {
        exists = i;
        console.log('exists', exists);
        break;
      }
    }

    if (exists === false) {
      throw('Can\'t find that item in the bag');
    }

    for (let i = 0; i < this.equipped[item.slot].length; i++) {
      console.log(`i:${i}, length:${this.equipped[item.slot].length}`);
      console.log(`item in slot ${item.slot}[${i}]: `, this.equipped[item.slot][i]);

      if (this.equipped[item.slot][i] === null) {
        this.equipped[item.slot][i] = item;
        break;
      }

      if (i >= (this.equipped[item.slot].length - 1)) {
        alert('no slots left');
        console.log('No slots left');
        return;
      }
    }

    console.log('equipped', this.equipped[item.slot]);
    console.log('---');

    this.stored.splice(exists, 1);
    this.parent.stats.updateStats(this.parent);
  }

  unequipItem(slot) {
    let item;
    if (Array.isArray(slot)) {
      item = this.equipped[slot[0]][slot[1]];
      this.equipped[slot[0]][slot[1]] = null;
    } else {
      item = this.equipped[slot];
      this.equipped[slot] = null;
    }

    this.stored.push(item);
    this.parent.stats.updateStats(this.parent);
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