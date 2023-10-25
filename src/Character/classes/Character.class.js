import { roll } from "@/utilities";
import races from "../../data/races";
import titles from "../../data/titles";
import Attributes from "./Attributes.class";
import Inventory from "./Inventory.class";
import Stats from "./Stats.class";

export default class Character
{
  constructor({
    name,
    race,
    attributeMods = {},
    level = 1,
    job = 'peasant'
  }) {
    if (typeof races[race] === 'undefined') {
      throw `Invalid race '${race}'`;
    }

    this.name = name.toString();
    this.race = race;
    this.level = level > 99 ? 99 : level;
    this.job = job;
    this.tier = this.determineTier();
    this.attributes = new Attributes( race, attributeMods );
    this.inventory = new Inventory();
    this.stats = new Stats( this.attributes, this.equipment );

    this.maxHealth = 100;
    this.health = 100;

    console.log(this);
  }

  determineTier() {
    const dice = this.calculateDiceSize();
    const title = titles[dice];

    return {
      title,
      dice,
    }
  }

  calculateDiceSize() {
    const multiplier = Math.floor( this.level / 10 ) + 1;
    return 5 * multiplier;
  }

  meleeAttack( target ) {
    const attackRoll = this.meleeAttackRoll();
    console.log(`Attack roll: ${attackRoll}`);
    const targetDefence = target.stats.defenceMod.melee.total;
    console.log(`Target def: ${targetDefence}`);
    
    const hit = attackRoll > targetDefence;
    console.log(`Hit: ${hit}`);
    if (hit) {
      const overDamage = (targetDefence - attackRoll) * -1;
      console.log(`Overdamage: ${overDamage}`);
      const targetArmour = target.stats.defenceMod.melee.equipment;
      console.log(`Target armour: ${targetArmour}`);
      const damage = this.strength.modifier + overDamage - targetArmour;
      console.log(`Total damage: ${damage}`);

      target.takeDamage(damage);
    }
  }

  meleeAttackRoll() {
    return roll(this.tier.dice) + this.stats.attackMod.melee.total;
  }

  takeDamage( damage ) {
    this.health = this.health - damage;
    console.log(`Target health: ${this.health}`);
  }

  get strength() {
    return this.attributes.strength;
  }
  get dexterity() {
    return this.attributes.dexterity;
  }
  get agility() {
    return this.attributes.agility;
  }
  get toughness() {
    return this.attributes.toughness;
  }
  get intelligence() {
    return this.attributes.intelligence;
  }
  get willpower() {
    return this.attributes.willpower;
  }
  get charisma() {
    return this.attributes.charisma;
  }
  get equipment() {
    return this.inventory.equipped;
  }
  get bag() {
    return this.inventory.stored;
  }

}