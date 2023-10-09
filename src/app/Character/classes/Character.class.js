import races from "../data/races";
import Attributes from "./Attributes.class";
import Inventory from "./Inventory.class";

export default class Character
{
  constructor( name, race ) {
    if (typeof races[race] === 'undefined') {
      throw `Invalid race '${race}'`;
    }

    this.name = name.toString();
    this.race = race;
    this.attributes = new Attributes( race );
    this.inventory = new Inventory();
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