import { create } from 'zustand';
import type { SheetConnections } from '../types/party';

// For BackgroundState, previously from origin/main
export type BackgroundAnswers = Record<string, string>;

export interface BackgroundState {
  answers: BackgroundAnswers;
  notes: string;
}

// Combined SheetState interface
export interface SheetState {
  id: string;                         // From HEAD's CharacterSheet
  connections?: SheetConnections;     // From HEAD's CharacterSheet / local branch
  classId: string | null;            // From origin/main's SheetState
  background: BackgroundState;        // From origin/main's SheetState
}

// Store interface
interface Store {
  sheet: SheetState;
  updateSheet: (patch: Partial<SheetState> | ((prevState: SheetState) => Partial<SheetState>)) => void;
}

export const useSheetStore = create<Store>((set) => ({
  sheet: { // Initial combined state
    id: 'sheet-1', // Default from local branch's CharacterSheet
    connections: {}, // Default from local branch's CharacterSheet
    classId: null, // Default from origin/main's SheetState
    background: { answers: {}, notes: '' }, // Default from origin/main's SheetState
  },
  updateSheet: (patch) =>
    set((state) => {
      // Allow patch to be a function for atomic updates if needed
      const resolvedPatch = typeof patch === 'function' ? patch(state.sheet) : patch;
      return {
        sheet: {
          ...state.sheet, // Spread existing state
          ...resolvedPatch, // Spread patch (handles top-level and replaces if not deep merged below)
          // Deep merge for 'background' if it's in the patch
          ...(resolvedPatch.background && {
            background: {
              ...state.sheet.background,
              ...resolvedPatch.background,
            },
          }),
          // Deep merge for 'connections' if it's in the patch
          ...(resolvedPatch.connections && {
            connections: {
              ...(state.sheet.connections ?? {}), // Handle if connections was initially undefined
              ...resolvedPatch.connections,
            },
          }),
        },
      };
    }),
}));
