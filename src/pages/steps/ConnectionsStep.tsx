import { useState } from 'react'
import classesData from '../../../data/classes.json'
import { useParty } from '../../stores/party'
import { useSheet } from '../../stores/sheet'
import type { SheetConnections } from '../../types/party'

const classNameMap = (classesData as { id: string; name: string }[]).reduce(
  (acc, cls) => {
    acc[cls.id] = cls.name
    return acc
  },
  {} as Record<string, string>
)

export default function ConnectionsStep() {
  const { sheet, updateSheet } = useSheet()
  const { party } = useParty()

  const otherChars = party.filter((p) => p.id !== sheet.id)

  const [connections, setConnections] = useState<SheetConnections>(
    sheet.connections ?? {}
  )

  const handleChange = (key: string, value: string) => {
    const next = { ...connections, [key]: value }
    setConnections(next)
    updateSheet({ connections: next })
  }

  const addMisc = () => {
    let idx = 1
    while (connections[`misc-${idx}`] !== undefined) idx += 1
    handleChange(`misc-${idx}`, '')
  }

  const connectionEntries = [
    ...otherChars.map((c) => ({ key: c.id, label: `Connection with ${c.name} (${classNameMap[c.classId] ?? c.classId})` })),
    ...Object.keys(connections)
      .filter((k) => k.startsWith('misc-'))
      .map((k) => ({ key: k, label: 'Miscellaneous Connection' })),
  ]

  const valid = Object.values(connections).some((v) => v.trim().length > 0)

  return (
    <div className="flex flex-col gap-4">
      {connectionEntries.map(({ key, label }) => (
        <div key={key} className="flex flex-col border p-2">
          <label className="mb-1 font-semibold" htmlFor={key}>
            {label}
          </label>
          <textarea
            id={key}
            className="border p-2 resize-none"
            placeholder="e.g., We survived the Siege of Eldor together…"
            rows={Math.min(
              6,
              Math.max(2, (connections[key] ?? '').split('\n').length)
            )}
            value={connections[key] ?? ''}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addMisc} className="self-start text-blue-600">
        Add miscellaneous connection
      </button>
      <div className="mt-4 flex justify-end gap-2">
        <button type="button" className="px-4 py-2 border">Back</button>
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white disabled:opacity-50"
          disabled={!valid}
        >
          Finish Character
        </button>
      </div>
    </div>
  )
}

