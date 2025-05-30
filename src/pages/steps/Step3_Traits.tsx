import { useEffect, useMemo, useState } from 'react'
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core'
import { TRAITS, MODIFIERS, validateTraits, type Trait } from '../../lib/traits'

interface Props {
  nextStep: () => void
  prevStep: () => void
  setField: (field: string, value: unknown) => void
}

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false)
  useEffect(() => {
    setCoarse(window.matchMedia('(pointer: coarse)').matches)
  }, [])
  return coarse
}

type ChipProps = {
  id: string
  value: number
  trait?: Trait
}

function Chip({ id, value, trait }: ChipProps) {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id,
    data: { value, trait }
  })
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="rounded-full bg-slate-200 px-3 py-1 font-mono shadow"
    >
      {value >= 0 ? `+${value}` : value}
    </div>
  )
}

function TraitRow({ trait, value }: { trait: Trait; value: number | null }) {
  const { isOver, setNodeRef } = useDroppable({ id: trait })
  const highlight = isOver ? 'ring-2 ring-indigo-400' : ''
  return (
    <div
      ref={setNodeRef}
      className={`flex items-center justify-between gap-2 p-2 border rounded ${highlight}`}
    >
      <span>{trait}</span>
      {value != null && <Chip id={`trait-${trait}`} value={value} trait={trait} />}
    </div>
  )
}

function Inventory({ chips }: { chips: { id: string; value: number }[] }) {
  const { isOver, setNodeRef } = useDroppable({ id: 'inventory' })
  const highlight = isOver ? 'ring-2 ring-indigo-400' : ''
  return (
    <div ref={setNodeRef} className={`flex flex-wrap gap-2 p-2 border rounded min-h-12 ${highlight}`}>
      {chips.map((c) => (
        <Chip key={c.id} id={c.id} value={c.value} />
      ))}
    </div>
  )
}

export default function Step3_Traits({ nextStep, prevStep, setField }: Props) {
  const initialTraits: Record<Trait, number | null> = useMemo(
    () => Object.fromEntries(TRAITS.map((t) => [t, null])) as Record<Trait, number | null>,
    []
  )
  const [localTraits, setLocalTraits] = useState<Record<Trait, number | null>>(initialTraits)

  const isCoarse = useCoarsePointer()

  const { ok, error } = useMemo(() => validateTraits(localTraits), [localTraits])

  const inventoryChips = useMemo(() => {
    const counts: Record<number, number> = {}
    for (const v of MODIFIERS) counts[v] = (counts[v] ?? 0) + 1
    for (const v of Object.values(localTraits)) if (v != null) counts[v]! -= 1
    const chips: { id: string; value: number }[] = []
    Object.entries(counts).forEach(([val, ct]) => {
      for (let i = 0; i < ct; i++) chips.push({ id: `inv-${val}-${i}`, value: Number(val) })
    })
    return chips
  }, [localTraits])

  const handleDragEnd = (e: DragEndEvent) => {
    const value = e.active.data.current?.value as number | undefined
    const fromTrait = e.active.data.current?.trait as Trait | undefined
    const overId = e.over?.id
    const toTrait = overId && overId !== 'inventory' ? (overId as Trait) : null
    if (value == null || overId == null) return

    setLocalTraits((prev) => {
      const next = { ...prev }
      if (fromTrait) next[fromTrait] = null
      if (toTrait) next[toTrait] = value
      return next
    })
  }

  const reset = () => setLocalTraits(initialTraits)

  const optionsForTrait = (trait: Trait) => {
    const counts: Record<number, number> = {}
    for (const v of MODIFIERS) counts[v] = (counts[v] ?? 0) + 1
    for (const [t, v] of Object.entries(localTraits)) {
      if (t === trait) continue
      if (v != null) counts[v]! -= 1
    }
    const opts: number[] = []
    Object.entries(counts).forEach(([val, ct]) => {
      for (let i = 0; i < ct; i++) opts.push(Number(val))
    })
    return opts
  }

  return (
    <div className="space-y-4">
      {isCoarse ? (
        <div className="space-y-2">
          {TRAITS.map((trait) => (
            <div key={trait} className="flex items-center gap-2">
              <span className="w-24">{trait}</span>
              <select
                className="border rounded p-1"
                value={localTraits[trait] ?? ''}
                onChange={(e) =>
                  setLocalTraits({ ...localTraits, [trait]: e.target.value === '' ? null : Number(e.target.value) })
                }
              >
                <option value="">--</option>
                {optionsForTrait(trait).map((v, i) => (
                  <option key={`${v}-${i}`} value={v}>
                    {v >= 0 ? `+${v}` : v}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <div className="space-y-2">
            {TRAITS.map((trait) => (
              <TraitRow key={trait} trait={trait} value={localTraits[trait]} />
            ))}
          </div>
          <Inventory chips={inventoryChips} />
        </DndContext>
      )}
      {error && <div className="bg-red-200 p-2 text-red-800 rounded">{error}</div>}
      <div className="flex items-center justify-between pt-4">
        <button className="px-4 py-2 border rounded" onClick={prevStep}>
          Back
        </button>
        <div className="flex items-center gap-4">
          <a href="#" onClick={reset} className="text-sm text-indigo-600">
            Reset
          </a>
          <button
            className="px-4 py-2 border rounded bg-indigo-600 text-white disabled:opacity-50"
            disabled={!ok}
            onClick={() => {
              setField('character.traits', localTraits)
              nextStep()
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
