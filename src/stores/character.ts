import { create } from 'zustand'
import { Trait, traitKey } from '../types/daggerheart'

export interface CharacterState {
  character: {
    traits: Partial<Record<ReturnType<typeof traitKey>, number>>
  }
  setField: (path: string, value: number | null) => void
  resetTraits: () => void
}

const initialTraits: Partial<Record<ReturnType<typeof traitKey>, number>> = {}

export const useCharacterStore = create<CharacterState>((set) => ({
  character: { traits: initialTraits },
  setField: (path, value) =>
    set((state) => {
      const parts = path.split('.')
      if (parts.length === 3 && parts[0] === 'character' && parts[1] === 'traits') {
        const key = parts[2] as ReturnType<typeof traitKey>
        return {
          character: {
            ...state.character,
            traits: {
              ...state.character.traits,
              [key]: value === null ? undefined : value,
            },
          },
        }
      }
      return state
    }),
  resetTraits: () =>
    set((state) => ({
      character: { ...state.character, traits: {} },
    })),
}))
