import { create } from 'zustand'

export interface Sheet {
  classId: string | null
  subclassId: string | null
  domainCards: string[]
}

interface CharacterState {
  class?: string
  subclass?: string
  sheet: Sheet
  setClass: (className: string, subclassName: string) => void
  updateSheet: (changes: Partial<Sheet>) => void
}

export const useCharacter = create<CharacterState>((set) => ({
  class: undefined,
  subclass: undefined,
  sheet: { classId: null, subclassId: null, domainCards: [] },
  setClass: (className, subclassName) =>
    set((state) => ({
      class: className,
      subclass: subclassName,
      sheet: {
        ...state.sheet,
        classId: className,
        subclassId: subclassName,
      },
    })),
  updateSheet: (changes) =>
    set((state) => ({ sheet: { ...state.sheet, ...changes } })),
}))
