import { useCallback } from 'react'
import { TRAITS, Trait, traitKey } from '../../types/daggerheart'
import { useCharacterStore } from '../../stores/character'
import { useStepStore } from '../../stores/steps'

const MODIFIERS = [2, 1, 1, 0, 0, -1] as const
const modifierCounts: Record<number, number> = { 2: 1, 1: 2, 0: 2, [-1]: 1 }

export default function Step3_Traits() {
  const traits = useCharacterStore((s) => s.character.traits)
  const setField = useCharacterStore((s) => s.setField)
  const resetTraits = useCharacterStore((s) => s.resetTraits)

  const nextStep = useStepStore((s) => s.nextStep)
  const prevStep = useStepStore((s) => s.prevStep)

  const usedCounts: Record<number, number> = { 2: 0, 1: 0, 0: 0, [-1]: 0 }
  for (const trait of TRAITS) {
    const key = traitKey(trait)
    const val = traits[key]
    if (val !== undefined) {
      usedCounts[val]++
    }
  }

  const remainingCounts: Record<number, number> = {
    2: modifierCounts[2] - usedCounts[2],
    1: modifierCounts[1] - usedCounts[1],
    0: modifierCounts[0] - usedCounts[0],
    [-1]: modifierCounts[-1] - usedCounts[-1],
  }

  const remainingChips: number[] = []
  for (const val of [2, 1, 0, -1]) {
    for (let i = 0; i < remainingCounts[val]; i++) {
      remainingChips.push(val)
    }
  }

  const allAssigned = TRAITS.every((t) => traits[traitKey(t)] !== undefined)
  const validDistribution = [2, 1, 0, -1].every(
    (v) => usedCounts[v] === modifierCounts[v],
  )
  const canNext = allAssigned && validDistribution

  const assignTrait = useCallback(
    (trait: Trait, value: number | null) => {
      const key = traitKey(trait)
      setField(`character.traits.${key}`, value)
    },
    [setField],
  )

  const onDrop = (trait: Trait, ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    const val = parseInt(ev.dataTransfer.getData('text/plain'))
    assignTrait(trait, val)
  }

  const onDragStart = (
    ev: React.DragEvent<HTMLDivElement>,
    val: number,
  ) => {
    ev.dataTransfer.setData('text/plain', String(val))
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="space-y-2 md:flex-1">
          {TRAITS.map((trait) => {
            const key = traitKey(trait)
            const current = traits[key]
            return (
              <div
                key={trait}
                className="border p-2 flex items-center justify-between rounded"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(trait, e)}
              >
                <span>{trait}</span>
                <div className="flex items-center gap-2">
                  <select
                    className="border p-1 rounded"
                    value={current ?? ''}
                    onChange={(e) =>
                      assignTrait(
                        trait,
                        e.target.value === '' ? null : parseInt(e.target.value),
                      )
                    }
                  >
                    <option value="">--</option>
                    {[2, 1, 0, -1].map((v) => {
                      const remaining = remainingCounts[v]
                      const disabled = remaining <= 0 && current !== v
                      return (
                        <option key={v} value={v} disabled={disabled}>
                          {v > 0 ? `+${v}` : v}
                        </option>
                      )
                    })}
                  </select>
                  <div className="w-10 h-8 flex items-center justify-center border rounded">
                    {current !== undefined ? (current > 0 ? `+${current}` : current) : ''}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="md:w-48 border p-2 rounded">
          <p className="font-bold mb-2">Modifiers</p>
          <div className="flex gap-2 flex-wrap">
            {remainingChips.map((val, idx) => (
              <div
                key={`${val}-${idx}`}
                className="px-2 py-1 bg-gray-200 rounded cursor-move"
                draggable
                onDragStart={(e) => onDragStart(e, val)}
              >
                {val > 0 ? `+${val}` : val}
              </div>
            ))}
          </div>
        </div>
      </div>
      {!canNext && (
        <div className="bg-red-100 text-red-800 p-2 rounded">
          Assign all modifiers to traits using each value exactly once.
        </div>
      )}
      <div className="flex gap-2">
        <button className="border px-4 py-2 rounded" onClick={prevStep}>
          Back
        </button>
        <button className="border px-4 py-2 rounded" onClick={resetTraits}>
          Reset
        </button>
        <button
          className="border px-4 py-2 rounded"
          disabled={!canNext}
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  )
}
