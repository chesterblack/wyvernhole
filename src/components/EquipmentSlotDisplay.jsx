import Item from "./Item";

export default function EquipmentSlotDisplay({ character, slot, inSlot }) {
  let slotContents = [];
  let i = 0;

  inSlot.forEach(element => {
    slotContents.push(
      <Item
        character={character}
        key={`${slot}-${i}`}
        item={element}
        equipped
        slot={[slot, i]}
      />
    );

    i++;
  });

  return (
    <div className="equipment-slot">
      <div className="slot-name">{slot}:</div>
      <div className="slot-contents">{slotContents}</div>
    </div>
  );
}