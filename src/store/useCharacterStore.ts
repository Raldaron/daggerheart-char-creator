import { create } from 'zustand'
import { calcCoreStats, CoreStats } from '../lib/calcCoreStats'

export interface Character {
  class?: string
}

interface CharacterState {
  character: Character
  level: number
  setClass: (classId: string) => void
  setLevel: (lvl: number) => void
  readonly coreStats: CoreStats
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  character: {},
  level: 1,
  setClass: (classId) => set((state) => ({ character: { ...state.character, class: classId } })),
  setLevel: (lvl) => set({ level: lvl }),
  get coreStats() {
    const { character, level } = get()
    return calcCoreStats({ classId: character.class!, level })
  },
}))
