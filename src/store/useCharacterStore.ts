import { create } from 'zustand'

export interface CharacterState {
  currentStep: number
  character: {
    name: string
    pronouns: string
    class: string | null
    subclass: string | null
    ancestry: string | null
    community: string | null
    traits: Record<
      'Agility' | 'Strength' | 'Finesse' | 'Instinct' | 'Presence' | 'Knowledge',
      number
    >
    experiences: string[]
    domains: string[]
    equipment: string[]
    connections: string[]
  }
}

export interface CharacterActions {
  nextStep: () => void
  prevStep: () => void
  setField: (path: string, value: unknown) => void
}

const initialState: CharacterState['character'] = {
  name: '',
  pronouns: '',
  class: null,
  subclass: null,
  ancestry: null,
  community: null,
  traits: {
    Agility: 0,
    Strength: 0,
    Finesse: 0,
    Instinct: 0,
    Presence: 0,
    Knowledge: 0,
  },
  experiences: [],
  domains: [],
  equipment: [],
  connections: [],
}

export const useCharacterStore = create<CharacterState & CharacterActions>()(
  (set) => ({
    currentStep: 0,
    character: { ...initialState },
    nextStep: () =>
      set((state) => ({ currentStep: Math.min(state.currentStep + 1, 8) })),
    prevStep: () =>
      set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
    setField: (path, value) =>
      set((state) => {
        const keys = path.split('.')
        if (keys.length === 1) {
          return {
            character: { ...state.character, [path]: value } as CharacterState['character'],
          }
        }
        // deep update
        const newCharacter = { ...state.character }
        let obj: any = newCharacter
        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i] as keyof typeof obj
          obj[key] = { ...(obj[key] || {}) }
          obj = obj[key]
        }
        obj[keys[keys.length - 1]] = value
        return { character: newCharacter }
      }),
  })
)

export default useCharacterStore
