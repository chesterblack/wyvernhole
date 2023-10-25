import { sumOfObject } from "../../utilities";

// To hit: Attacker’s DEX + items + level + tier roll
// AC: Defender’s AGI + level + items
// Damage: Attacker's STR + to hit amount over defence - defender’s items

export default class Stats
{
  constructor( attributes, equipment, level = 1 ) {
    this.attributes = attributes;
    this.equipment = equipment;
    this.level = level;

    this.attackMod = {
      melee: this.calculateStatMods('dexterity', ['attack', 'meleeAttack']),
      ranged: this.calculateStatMods('dexterity', ['attack', 'rangedAttack']),
      magic: this.calculateStatMods('dexterity', ['attack', 'magicAttack']),
    };

    this.defenceMod = {
      melee: this.calculateStatMods('agility', ['defence', 'physicalDefence']),
      ranged: this.calculateStatMods('agility', ['defence', 'physicalDefence']),
      magic: this.calculateStatMods('agility', ['defence', 'magicDefence']),
    };

    this.damageMod = {
      melee: this.calculateStatMods('strength', ['attack', 'meleeAttack']),
      ranged: this.calculateStatMods(null, ['attack', 'rangedAttack']),
      magic: this.calculateStatMods('willpower', ['attack', 'magicAttack']),
    };

    delete this.attributes;
    delete this.equipment;
    delete this.level;
  }

  handleMultislotStatMods( stat, slot ) {
    let runningTotal = 0;
    slot.forEach(item => {
      runningTotal += item?.properties?.[stat] ?? 0;
    });

    return runningTotal;
  }

  equipmentStatMods( stat, collection = this.equipment ) {
    let runningModifier = 0;

    for (const key in collection) {
      if (Object.hasOwnProperty.call(collection, key)) {
        const slot = collection[key];

        slot.forEach(item => {
          runningModifier += item?.properties?.[stat] ?? 0;
        });
      }
    }

    return runningModifier;
  }

  calculateStatMods( attributes, equipmentStats ) {
    attributes = typeof attributes == "object" ? attributes : [ attributes ];
    let mods = {};

    mods.level = this.level;
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