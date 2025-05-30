import { useState } from 'react'
import ancestries from '../../data/ancestries.json'
import communities from '../../data/communities.json'
import { useStore } from '../../store'

type Ancestry = {
  id: string
  name: string
  topFeature: string
  bottomFeature: string
}

type Community = {
  id: string
  name: string
  feature: string
}

export default function Step2_Heritage() {
  const { setField, nextStep, previousStep } = useStore((s) => ({
    setField: s.setField,
    nextStep: s.nextStep,
    previousStep: s.previousStep,
  }))

  const [mixed, setMixed] = useState(false)
  const [primary, setPrimary] = useState<string | null>(null)
  const [secondary, setSecondary] = useState<string | null>(null)
  const [community, setCommunity] = useState<string | null>(null)

  const handleNext = () => {
    if (!primary || !community || (mixed && !secondary)) return
    setField('character.ancestry', primary)
    setField('character.mixedAncestry', mixed)
    setField('character.community', community)
    setField('character.ancestrySecondary', mixed ? secondary : null)
    nextStep()
  }

  const getAncestry = (id: string | null) =>
    (ancestries as Ancestry[]).find((a) => a.id === id)

  const topFeature = getAncestry(primary)?.topFeature
  const bottomFeature = mixed
    ? getAncestry(secondary)?.bottomFeature
    : getAncestry(primary)?.bottomFeature
  const communityFeature = (communities as Community[]).find((c) => c.id === community)?.feature

  const disabledNext = !primary || !community || (mixed && !secondary)

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Choose Heritage</h2>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={mixed}
          onChange={(e) => {
            setMixed(e.target.checked)
            setSecondary(null)
          }}
        />
        Mixed Ancestry
      </label>

      <div>
        <h3 className="font-semibold mb-2">Ancestry</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {(ancestries as Ancestry[]).map((a) => (
            <button
              key={a.id}
              className={`border rounded p-2 ${!mixed && primary === a.id ? 'bg-blue-200' : ''}`}
              onClick={() => {
                setPrimary(a.id)
                if (!mixed) setSecondary(null)
              }}
            >
              {a.name}
            </button>
          ))}
        </div>
      </div>

      {mixed && (
        <div>
          <h3 className="font-semibold mb-2">Ancestry Bottom Feature</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {(ancestries as Ancestry[]).map((a) => (
              <button
                key={a.id}
                className={`border rounded p-2 ${secondary === a.id ? 'bg-blue-200' : ''}`}
                onClick={() => setSecondary(a.id)}
              >
                {a.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-2">Community</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {(communities as Community[]).map((c) => (
            <button
              key={c.id}
              className={`border rounded p-2 ${community === c.id ? 'bg-blue-200' : ''}`}
              onClick={() => setCommunity(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="border p-2 rounded">
        <h3 className="font-semibold mb-2">Feature Preview</h3>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {topFeature && <li>{topFeature}</li>}
          {bottomFeature && <li>{bottomFeature}</li>}
          {communityFeature && <li>{communityFeature}</li>}
        </ul>
      </div>

      <div className="flex gap-2 justify-end">
        <button className="px-4 py-2 border rounded" onClick={previousStep}>
          Back
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={disabledNext}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  )
}
