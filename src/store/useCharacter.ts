import { create } from 'zustand'

export interface CharacterSheet {
  level: number
  inventory: string[]
  equipment?: {
    primaryWeapon?: unknown
    secondaryWeapon?: unknown | null
    armor?: unknown
    damageRoll?: string
    armorScore?: number
  }
}

interface CharacterState {
  sheet: CharacterSheet
  updateSheet: (changes: Partial<CharacterSheet>) => void
  class?: string
  subclass?: string
  setClass: (className: string, subclassName: string) => void
}

export const useCharacter = create<CharacterState>((set) => ({
  sheet: { level: 1, inventory: [] },
  updateSheet: (changes) =>
    set((state) => ({ sheet: { ...state.sheet, ...changes } })),
  class: undefined,
  subclass: undefined,
  setClass: (className, subclassName) =>
    set({ class: className, subclass: subclassName }),
}))
