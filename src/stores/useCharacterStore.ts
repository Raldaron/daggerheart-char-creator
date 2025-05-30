import { create } from 'zustand'

interface CharacterState {
  characterClass: string
  heritage: string
  culture: string
  path: string
  attributes: string
  abilities: string
  equipment: string
  backstory: string
  connections: string
  setCharacterClass: (value: string) => void
  setHeritage: (value: string) => void
  setCulture: (value: string) => void
  setPath: (value: string) => void
  setAttributes: (value: string) => void
  setAbilities: (value: string) => void
  setEquipment: (value: string) => void
  setBackstory: (value: string) => void
  setConnections: (value: string) => void
}

export const useCharacterStore = create<CharacterState>((set) => ({
  characterClass: '',
  heritage: '',
  culture: '',
  path: '',
  attributes: '',
  abilities: '',
  equipment: '',
  backstory: '',
  connections: '',
  setCharacterClass: (value) => set({ characterClass: value }),
  setHeritage: (value) => set({ heritage: value }),
  setCulture: (value) => set({ culture: value }),
  setPath: (value) => set({ path: value }),
  setAttributes: (value) => set({ attributes: value }),
  setAbilities: (value) => set({ abilities: value }),
  setEquipment: (value) => set({ equipment: value }),
  setBackstory: (value) => set({ backstory: value }),
  setConnections: (value) => set({ connections: value }),
}))
