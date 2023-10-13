import EquipmentSlotDisplay from "./EquipmentSlotDisplay";

export default function EquipmentDisplay({ character }) {
  const { equipment } = character;

  return (
    <>
      {Object.keys(equipment).map((slot) => {
        const inSlot = equipment[slot];
        return <EquipmentSlotDisplay character={character} key={slot} slot={slot} inSlot={inSlot} />
      })}
    </>
  )
}