import { sumOfObject } from "../../utilities";

// To hit: Attacker’s DEX + items + level + tier roll
// AC: Defender’s AGI + level + items
// Damage: Attacker's STR + to hit amount over defence - defender’s items

export default class Stats
{
  constructor( character ) {
    this.character = character;
    this.updateStats( character );
  }

  updateStats( character ) {
    this.attributes = character.attributes;
    this.equipment = character.inventory.equipped;
    this.tier = character.tier;

    this.attackMod = {
      title: 'Attack Modifiers',
      melee: {
        title: 'Melee Attack Modifier', 
        ...this.calculateStatMods('dexterity', ['attack', 'meleeAttack'])
      },
      ranged: {
        title: 'Ranged Attack Modifier',
        ...this.calculateStatMods('dexterity', ['attack', 'rangedAttack'])
      },
      magic: {
        title: 'Magical Attack Modifier',
        ...this.calculateStatMods('dexterity', ['attack', 'magicAttack'])
      },
    };

    this.defenceMod = {
      title: 'Defence Modifiers',
      melee: {
        title: 'Physical Defence',
        ...this.calculateStatMods('agility', ['defence', 'physicalDefence'])
      },
      magic: {
        title: 'Magical Defence',
        ...this.calculateStatMods('agility', ['defence', 'magicDefence'])
      },
    };

    this.damageMod = {
      title: 'Damage Modifiers',
      melee: {
        title: 'Melee Damage Modifier',
        ...this.calculateStatMods('strength', ['attack', 'meleeAttack'])
      },
      ranged: {
        title: 'Ranged Damage Modifier',
        ...this.calculateStatMods(null, ['attack', 'rangedAttack'])
      },
      magic: {
        title: 'Magical Damage Modifier',
        ...this.calculateStatMods('willpower', ['attack', 'magicAttack'])
      },
    };

    delete this.attributes;
    delete this.equipment;
    delete this.tier;
  }

  handleMultislotStatMods( stat, slot ) {
    let runningTotal = 0;
    slot.forEach(item => {
      runningTotal += item?.properties?.[stat] ?? 0;
    });

    return runningTotal;
  }

  equipmentStatMods( stats, collection = this.equipment ) {
    let runningModifier = 0;

    for (const key in collection) {
      if (Object.hasOwnProperty.call(collection, key)) {
        const slot = collection[key];

        slot.forEach(item => {
          if (item !== null) {
            stats.forEach(stat => {
              runningModifier += item?.properties?.[stat] ?? 0;
            });
          }
        });
      }
    }

    return runningModifier;
  }

  calculateStatMods( attributes, equipmentStats ) {
    attributes = typeof attributes == "object" ? attributes : [ attributes ];
    let mods = {};

    mods.level = this.tier.rank;
    if (attributes) {
      attributes.forEach(attribute => {
        mods[attribute] = this.attributes[attribute].modifier;
      });
    }
    mods.equipment = this.equipmentStatMods(equipmentStats);
    mods.total = sumOfObject(mods);

    return mods;
  }
}