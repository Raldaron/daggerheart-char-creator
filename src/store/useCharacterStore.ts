import { create } from 'zustand'

interface CoreStats {
  level: number
  evasion: number
  hitPoints: number
  stressSlots: number
  hope: number
}

interface CharacterState {
  coreStats: CoreStats
  armorScore?: number
}

export const useCharacterStore = create<CharacterState>(() => ({
  coreStats: {
    level: 1,
    evasion: 10,
    hitPoints: 5,
    stressSlots: 3,
    hope: 0,
  },
  armorScore: undefined,
}))
