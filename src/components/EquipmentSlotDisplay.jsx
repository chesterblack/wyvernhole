import Item from "./Item";

export default function EquipmentSlotDisplay({ slot, inSlot }) {
  let slotContents;
  if (Array.isArray(inSlot)) {
    slotContents = [];
    let i = 0;
    inSlot.forEach(element => {
      i++;
      slotContents.push( <Item key={`${slot}-${i}`} item={element} /> );
    });
  } else {
    slotContents = <Item item={inSlot} />
  }

  return (
    <div className="equipment-slot">
      <div className="slot-name">{slot}:</div>
      <div className="slot-contents">{slotContents}</div>
    </div>
  );
}