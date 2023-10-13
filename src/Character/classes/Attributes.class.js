import races from "../../data/races";

export default class Attributes
{
  constructor( race = 'human', miscModifiers = {} ) {
    this.strength     = this.defineAttribute(); // Physical damage
    this.dexterity    = this.defineAttribute(); // Phys + magic to-hit
    this.agility      = this.defineAttribute(); // Physical defence
    this.toughness    = this.defineAttribute(); // Health
    this.intelligence = this.defineAttribute(); // Magic damage, mana
    this.willpower    = this.defineAttribute(); // Magic defence, mana
    this.charisma     = this.defineAttribute(); // Shop prices

    this.applyRacialModifiers( race );
    this.applyMiscModifiers( miscModifiers );
  }

  defineAttribute( score = 10 ) {
    return {
      natural: score,
      score,
      modifier: this.calculateModifier( score ),
    }
  }

  calculateModifier( score ) {
    return score - 10;
  }

  applyRacialModifiers( race ) {
    const { racialAttributeModifiers } = races[race];
    for (const attribute in racialAttributeModifiers) {
      if (Object.hasOwnProperty.call(racialAttributeModifiers, attribute)) {
        const modifier = racialAttributeModifiers[attribute];
        this[attribute] = this.defineAttribute(10 + modifier);
      }
    }
  }

  /**
   * 
   * @param {object} modifiers Object of attributes to modify
   */
  applyMiscModifiers( modifiers ) {
    for (const attribute in modifiers) {
      if (Object.hasOwnProperty.call(modifiers, attribute)) {
        const modifier = modifiers[attribute];

        if (typeof this[attribute] === 'undefined') {
          throw "Invalid attribute being modified";
        }

        if (typeof modifier !== 'number') {
          throw `Invalid modifier to attribute ${attribute}`;
        }

        this[attribute] = this.defineAttribute(
          parseInt(this[attribute].score) + parseInt(modifier)
        );
      }
    }
  }
}