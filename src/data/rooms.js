const rooms = [
  {
    description: "You approach a tavern, the sign on the door reads: The Savoury Salmon. It seems humble, but reasonably well-kept.",
    options: [
      {
        text: "Walk in",
        roomKey: 1,
      }
    ]
  },
  {
    description: "A middle-aged woman smiles at you from behind the bar, two old men sit bickering at a nearby table.",
    options: [
      {
        text: "Back",
        roomKey: 0
      },
      {
        text: "Approach the bar",
        roomKey: 2,
      },
      {
        text: "Approach the old men",
        roomKey: 3,
      }
    ]
  },
  {
    description: "Bar",
    options: [
      {
        text: "Back",
        roomKey: 1,
      }
    ]
  },
  {
    description: "Old men",
    options: [
      {
        text: "Back",
        roomKey: 1,
      }
    ]
  },
];

export default rooms;