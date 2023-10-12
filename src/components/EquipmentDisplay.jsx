import EquipmentSlotDisplay from "./EquipmentSlotDisplay";

export default function EquipmentDisplay({ equipment }) {
  return (
    <>
      {Object.keys(equipment).map((slot) => {
        const inSlot = equipment[slot];
        return <EquipmentSlotDisplay key={slot} slot={slot} inSlot={inSlot} />
      })}
    </>
  )
}