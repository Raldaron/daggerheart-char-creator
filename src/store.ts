import { create } from 'zustand'

export type Character = {
  ancestry?: string | null
  ancestrySecondary?: string | null
  community?: string | null
  mixedAncestry?: boolean
}

export type CreatorState = {
  character: Character
  step: number
  setField: (path: string, value: unknown) => void
  nextStep: () => void
  previousStep: () => void
}

export const useStore = create<CreatorState>((set) => ({
  character: {
    ancestry: null,
    ancestrySecondary: null,
    community: null,
    mixedAncestry: false,
  },
  step: 1,
  setField: (path, value) =>
    set((state) => {
      if (!path.startsWith('character.')) return state
      const key = path.replace('character.', '') as keyof Character
      return { character: { ...state.character, [key]: value } }
    }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  previousStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
}))
