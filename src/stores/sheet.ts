import { create } from 'zustand'
import type { SheetConnections } from '../types/party'

export interface CharacterSheet {
  id: string
  connections?: SheetConnections
}

interface SheetState {
  sheet: CharacterSheet
  updateSheet: (partial: Partial<CharacterSheet>) => void
}

export const useSheet = create<SheetState>((set) => ({
  sheet: { id: 'sheet-1', connections: {} },
  updateSheet: (partial) =>
    set((state) => ({ sheet: { ...state.sheet, ...partial } })),
}))

