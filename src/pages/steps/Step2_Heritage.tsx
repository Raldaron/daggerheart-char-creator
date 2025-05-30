import { useCharacterStore } from '../../stores/useCharacterStore'

export default function Step2_Heritage() {
  const heritage = useCharacterStore((state) => state.heritage)
  const setHeritage = useCharacterStore((state) => state.setHeritage)

  return (
    <div>
      <h2>Step 2: Heritage</h2>
      <input
        value={heritage}
        onChange={(e) => setHeritage(e.target.value)}
        placeholder="Select a heritage"
      />
    </div>
  )
}
