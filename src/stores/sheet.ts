import { create } from 'zustand'

export type BackgroundAnswers = Record<string, string>

export interface BackgroundState {
  answers: BackgroundAnswers
  notes: string
}

export interface SheetState {
  classId: string | null
  background: BackgroundState
}

interface Store {
  sheet: SheetState
  updateSheet: (patch: Partial<SheetState>) => void
}

export const useSheetStore = create<Store>((set) => ({
  sheet: { classId: null, background: { answers: {}, notes: '' } },
  updateSheet: (patch) =>
    set((state) => ({
      sheet: {
        ...state.sheet,
        ...patch,
        background: {
          ...state.sheet.background,
          ...(patch.background ?? {}),
        },
      },
    })),
}))
