import { useCharacterStore } from '../../stores/useCharacterStore'

export default function Step6_Abilities() {
  const abilities = useCharacterStore((state) => state.abilities)
  const setAbilities = useCharacterStore((state) => state.setAbilities)

  return (
    <div>
      <h2>Step 6: Abilities</h2>
      <input
        value={abilities}
        onChange={(e) => setAbilities(e.target.value)}
        placeholder="Choose abilities"
      />
    </div>
  )
}
