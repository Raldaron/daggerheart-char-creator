export interface CoreStats {
  level: number
  evasion: number
  hitPoints: number
  stressSlots: number
  hope: number
}

export const BASE_STRESS = 6
export const BASE_HOPE = 2

interface ClassEntry {
  id: string
  startingEvasion: number
  startingHitPoints: number
}

import classes from '../data/classes.json'

export function calcCoreStats(opts: { classId: string; level?: number }): CoreStats {
  const level = opts.level ?? 1
  const klass = (classes as ClassEntry[]).find((c) => c.id === opts.classId)
  if (!klass) throw new Error(`Unknown class id: ${opts.classId}`)

  // TODO: apply armor bonuses and trait effects to evasion
  const evasion = klass.startingEvasion

  // TODO: include armor bonuses and trait effects in hit point calculation
  const hitPoints = klass.startingHitPoints + (level - 1)

  return {
    level,
    evasion,
    hitPoints,
    // TODO: handle modifiers that adjust stress slots
    stressSlots: BASE_STRESS,
    // TODO: apply hope modifiers from traits or items
    hope: BASE_HOPE,
  }
}
