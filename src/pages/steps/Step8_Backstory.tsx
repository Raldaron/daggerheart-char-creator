import { useCharacterStore } from '../../stores/useCharacterStore'

export default function Step8_Backstory() {
  const backstory = useCharacterStore((state) => state.backstory)
  const setBackstory = useCharacterStore((state) => state.setBackstory)

  return (
    <div>
      <h2>Step 8: Backstory</h2>
      <input
        value={backstory}
        onChange={(e) => setBackstory(e.target.value)}
        placeholder="Write a backstory"
      />
    </div>
  )
}
