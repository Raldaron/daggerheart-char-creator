import { create } from 'zustand'

interface CharacterState {
  class?: string
  subclass?: string
  setClass: (className: string, subclassName: string) => void
}

export const useCharacter = create<CharacterState>((set) => ({
  class: undefined,
  subclass: undefined,
  setClass: (className, subclassName) =>
    set({ class: className, subclass: subclassName }),
}))
