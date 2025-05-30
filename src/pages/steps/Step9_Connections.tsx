import { useCharacterStore } from '../../stores/useCharacterStore'

export default function Step9_Connections() {
  const connections = useCharacterStore((state) => state.connections)
  const setConnections = useCharacterStore((state) => state.setConnections)

  return (
    <div>
      <h2>Step 9: Connections</h2>
      <input
        value={connections}
        onChange={(e) => setConnections(e.target.value)}
        placeholder="Define connections"
      />
    </div>
  )
}
