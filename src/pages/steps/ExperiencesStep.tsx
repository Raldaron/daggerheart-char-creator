import { useEffect, useState } from 'react'
import badExp from '../../../data/experienceBlacklist.json'
import { useCharacterStore } from '../../stores/useCharacterStore'

function isNonEmpty(value: string) {
  return value.trim().length > 0
}

function isUnder30Chars(value: string) {
  return value.length <= 30
}

function isDistinct(list: string[]) {
  return new Set(list.map((s) => s.trim().toLowerCase())).size === list.length
}

function isNotTooBroad(value: string) {
  return !badExp.includes(value.trim().toLowerCase())
}

export default function ExperiencesStep() {
  const stored = useCharacterStore((s) => s.experiences)
  const save = useCharacterStore((s) => s.setExperiences)

  const [experiences, setExperiences] = useState<string[]>(stored || ['', ''])

  const update = (idx: number, value: string) => {
    const next = [...experiences]
    next[idx] = value
    setExperiences(next)
  }

  const validations = experiences.map((exp) => ({
    isNonEmpty: isNonEmpty(exp),
    isUnder30Chars: isUnder30Chars(exp),
    isNotTooBroad: isNotTooBroad(exp),
  }))
  const distinct = isDistinct(experiences)
  const allValid =
    distinct && validations.every((v) => v.isNonEmpty && v.isUnder30Chars && v.isNotTooBroad)

  useEffect(() => {
    if (allValid) save(experiences)
  }, [allValid, experiences, save])

  return (
    <div>
      <h2>Choose Experiences</h2>
      {experiences.map((exp, idx) => {
        const val = validations[idx]
        return (
          <div key={idx} className="mb-4">
            <input
              value={exp}
              onChange={(e) => update(idx, e.target.value)}
              className="border p-1"
            />
            {!val.isNonEmpty && <p className="text-red-500 text-sm">Required</p>}
            {!val.isUnder30Chars && (
              <p className="text-red-500 text-sm">Must be 30 characters or less</p>
            )}
            {!val.isNotTooBroad && (
              <p className="text-red-500 text-sm">Too broad, choose something more specific</p>
            )}
            {!distinct && <p className="text-red-500 text-sm">Experiences must be unique</p>}
          </div>
        )
      })}
      <div className="flex gap-2 justify-end">
        <button className="px-4 py-2 border rounded">Back</button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={!allValid}
        >
          Next
        </button>
      </div>
    </div>
  )
}
