export interface CalcCoreStatsParams {
  classId: string
  level: number
}

export interface CoreStats {
  power: number
  agility: number
  focus: number
}

// Placeholder implementation. Real logic should derive stats from class and level.
export function calcCoreStats({ classId, level }: CalcCoreStatsParams): CoreStats {
  const base = level * 2
  switch (classId) {
    case 'warrior':
      return { power: base + 2, agility: base, focus: base - 1 }
    case 'rogue':
      return { power: base, agility: base + 2, focus: base - 1 }
    case 'mage':
      return { power: base - 1, agility: base, focus: base + 2 }
    default:
      return { power: base, agility: base, focus: base }
  }
}
