import { useCharacterStore } from '../../stores/useCharacterStore'

export default function Step4_Path() {
  const path = useCharacterStore((state) => state.path)
  const setPath = useCharacterStore((state) => state.setPath)

  return (
    <div>
      <h2>Step 4: Path</h2>
      <input
        value={path}
        onChange={(e) => setPath(e.target.value)}
        placeholder="Select a path"
      />
    </div>
  )
}
