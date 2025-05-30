export interface ClassData {
  name: string
  evasion: number
  hitPoints: number
}

export interface CoreStats {
  hitPoints: number
  evasion: number
}

/**
 * Calculates hit points and evasion for a class at a given level.
 * This implementation is intentionally simple for unit testing.
 */
export function calcCoreStats(classData: ClassData, level: number): CoreStats {
  // Base hit points come from the class definition
  const baseHp = classData.hitPoints
  // For this simplified logic each level after 1 adds +1 HP
  const hitPoints = baseHp + Math.max(0, level - 1)
  return {
    hitPoints,
    evasion: classData.evasion,
  }
}
