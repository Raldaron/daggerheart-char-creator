import { useCharacterStore } from '../../stores/useCharacterStore'

export default function Step1_Class() {
  const characterClass = useCharacterStore((state) => state.characterClass)
  const setCharacterClass = useCharacterStore((state) => state.setCharacterClass)

  return (
    <div>
      <h2>Step 1: Class</h2>
      <input
        value={characterClass}
        onChange={(e) => setCharacterClass(e.target.value)}
        placeholder="Select a class"
      />
    </div>
  )
}
