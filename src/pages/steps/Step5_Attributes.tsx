import { useCharacterStore } from '../../stores/useCharacterStore'

export default function Step5_Attributes() {
  const attributes = useCharacterStore((state) => state.attributes)
  const setAttributes = useCharacterStore((state) => state.setAttributes)

  return (
    <div>
      <h2>Step 5: Attributes</h2>
      <input
        value={attributes}
        onChange={(e) => setAttributes(e.target.value)}
        placeholder="Set attributes"
      />
    </div>
  )
}
