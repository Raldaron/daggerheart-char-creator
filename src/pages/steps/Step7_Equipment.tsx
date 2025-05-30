import { useCharacterStore } from '../../stores/useCharacterStore'

export default function Step7_Equipment() {
  const equipment = useCharacterStore((state) => state.equipment)
  const setEquipment = useCharacterStore((state) => state.setEquipment)

  return (
    <div>
      <h2>Step 7: Equipment</h2>
      <input
        value={equipment}
        onChange={(e) => setEquipment(e.target.value)}
        placeholder="Choose equipment"
      />
    </div>
  )
}
