const items = {
  sword: {
    id: 1,
    slot: 'hands',
    name: 'Sword',
    description: 'A simple sword, frequently swung, infrequently sharpened.',
    properties: {
      meleeAttack: 2,
      physicalDefence: 1,
    }
  },
  dagger: {
    id: 2,
    slot: 'hands',
    name: 'Dagger',
    description: 'A short, cruel blade.',
    properties: {
      meleeAttack: 1,
      dexterity: 1,
    }
  },
  buckler: {
    id: 3,
    slot: 'hands',
    name: 'Buckler',
    description: 'A small round shield, made for parrying.',
    properties: {
      defence: 2,
      dexterity: 1,
    }
  },
  shield: {
    id: 4,
    slot: 'hands',
    name: 'Shield',
    description: 'A simple disc of wood could be the difference between life and death.',
    properties: {
      defence: 4,
    }
  },
  tower_shield: {
    id: 5,
    slot: 'hands',
    name: 'Tower Shield',
    description: 'An enormous bulwark of steel and oak.',
    properties: {
      defence: 6,
      dexterity: -2,
    }
  }
}

export default items;