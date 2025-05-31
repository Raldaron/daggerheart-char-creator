import { describe, it, expect } from 'vitest'
import { calcCoreStats, type ClassData } from './calcCoreStats'

// Mocked sample entry similar to classes.json
const mockClass: ClassData = {
  name: 'Warrior',
  evasion: 2,
  hitPoints: 10,
}

describe('calcCoreStats', () => {
  it('level 1/granting class returns expected evasion & HP', () => {
    const result = calcCoreStats(mockClass, 1)
    expect(result.evasion).toBe(2)
    expect(result.hitPoints).toBe(10)
  })

  it('level 5 increases hitPoints by +4', () => {
    const level1 = calcCoreStats(mockClass, 1)
    const level5 = calcCoreStats(mockClass, 5)
    expect(level5.hitPoints - level1.hitPoints).toBe(4)
  })
})
