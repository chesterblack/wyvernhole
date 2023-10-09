const races = {
  human: {
    racialAttributeModifiers: {
      strength: 0,
      dexterity: 0,
      agility: 0,
      toughness: 0,
      intelligence: 0,
      willpower: 0,
      charisma: 0,
    },
  },
  elf: {
    racialAttributeModifiers: {
      strength: -1,
      dexterity: 1,
      agility: 1,
      toughness: -2,
      intelligence: 1,
      willpower: 0,
      charisma: 0,
    },
  },
  dwarf: {
    racialAttributeModifiers: {
      strength: 1,
      dexterity: 0,
      agility: -2,
      toughness: 2,
      intelligence: -2,
      willpower: 1,
      charisma: 0,
    },
  },
  halfling: {
    racialAttributeModifiers: {
      strength: -2,
      dexterity: 1,
      agility: 2,
      toughness: -1,
      intelligence: -1,
      willpower: 0,
      charisma: 1,
    },
  },
  orc: {
    racialAttributeModifiers: {
      strength: 2,
      dexterity: 0,
      agility: 0,
      toughness: 2,
      intelligence: -1,
      willpower: -2,
      charisma: -1,
    },
  },
}
export default races;