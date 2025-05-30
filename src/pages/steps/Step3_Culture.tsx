import { useCharacterStore } from '../../stores/useCharacterStore'

export default function Step3_Culture() {
  const culture = useCharacterStore((state) => state.culture)
  const setCulture = useCharacterStore((state) => state.setCulture)

  return (
    <div>
      <h2>Step 3: Culture</h2>
      <input
        value={culture}
        onChange={(e) => setCulture(e.target.value)}
        placeholder="Select a culture"
      />
    </div>
  )
}
