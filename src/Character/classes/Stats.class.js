import { sumOfArray } from "../../utilities";

export default class Stats
{
  constructor( attributes, equipment, level = 1 ) {
    this.attributes = attributes;
    this.equipment = equipment;
    this.level = level;

    this.attackMod = {
      melee: this.calculateMeleeAttack(),
      ranged: this.calculateRangedAttack(),
      magic: this.calculateMagicAttack(),
    };

    this.defenceMod = {
      melee: this.calculateMeleeDefence(),
      ranged: this.calculateRangedDefence(),
      magic: this.calculateMagicDefence(),
    };

    this.damageMod = {
      melee: this.calculateMeleeDamage(),
      ranged: this.calculateRangedDamage(),
      magic: this.calculateMagicDamage(),
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

        if (Array.isArray(slot)) {
          // There's multiple items in this slot, ie. hands, rings
          runningModifier = runningModifier + this.handleMultislotStatMods(stat, slot);
        } else {
          // This slot contains one or none items
          const item = slot;
          if (typeof item?.properties?.[stat] === 'number') {
            runningModifier += + item.statEnhancements?.[stat];
          }
        }
      }
    }

    return runningModifier;
  }

  calculateMeleeAttack() {
    const mods = [
      this.level,
      this.attributes.dexterity.modifier,
      this.equipmentStatMods( 'attack' ),
      this.equipmentStatMods( 'meleeAttack' ),
    ];

    return sumOfArray( mods );
  }

  calculateRangedAttack() {
    const mods = [
      this.level,
      this.attributes.dexterity.modifier,
      this.equipmentStatMods( 'attack' ),
      this.equipmentStatMods( 'rangedAttack' ),
    ];

    return sumOfArray( mods );
  }

  calculateMagicAttack() {
    const mods = [
      this.level,
      this.attributes.dexterity.modifier,
      this.equipmentStatMods( 'magicAttack' ),
    ];

    return sumOfArray( mods );
  }

  calculateMeleeDamage() {
    const mods = [
      this.level,
      this.attributes.strength.modifier,
      this.equipmentStatMods( 'attack' ),
      this.equipmentStatMods( 'meleeAttack' ),
    ];

    return sumOfArray( mods );
  }
  
  calculateRangedDamage() {
    const mods = [
      this.level,
      this.equipmentStatMods( 'attack' ),
      this.equipmentStatMods( 'rangedAttack' ),
    ];
  
    return sumOfArray( mods );
  }

  calculateMagicDamage() {
    const mods = [
      this.level,
      this.attributes.willpower.modifier,
      this.equipmentStatMods( 'magicAttack' ),
    ];

    return sumOfArray( mods );
  }

  calculateMeleeDefence() {
    const mods = [
      this.level,
      this.attributes.agility.modifier,
      this.equipmentStatMods( 'defence' ),
      this.equipmentStatMods( 'meleeDefence' ),
    ];

    return sumOfArray( mods );
  }

  calculateRangedDefence() {
    const mods = [
      this.level,
      this.attributes.agility.modifier,
      this.equipmentStatMods( 'defence' ),
      this.equipmentStatMods( 'rangedDefence' ),
    ];

    return sumOfArray( mods );
  }

  calculateMagicDefence() {
    const mods = [
      this.level,
      this.attributes.agility.modifier,
      this.equipmentStatMods( 'magicDefence' ),
    ];

    return sumOfArray( mods );
  }
}