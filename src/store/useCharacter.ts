import { create } from 'zustand';

// Combined CharacterSheet interface from origin/main
export interface CharacterSheet {
  level: number;
  inventory: string[];
  equipment?: {
    primaryWeapon?: unknown; // Consider using more specific types if available
    secondaryWeapon?: unknown | null;
    armor?: unknown;
    damageRoll?: string;
    armorScore?: number;
  };
  classId: string | null;
  subclassId: string | null;
  domainCards: string[];
}

const initialSheet: CharacterSheet = {
  level: 1,
  inventory: [],
  classId: null,
  subclassId: null,
  domainCards: [],
};

// CharacterState interface from origin/main
interface CharacterState {
  sheet: CharacterSheet; // Single source of truth for sheet data
  class?: string; // From HEAD, potentially display name for class
  subclass?: string; // From HEAD, potentially display name for subclass
  setClass: (className: string, subclassName: string) => void; // From HEAD
  updateSheet: (
    changes: Partial<CharacterSheet> | ((prevState: CharacterSheet) => Partial<CharacterSheet>)
  ) => void; // Combined
  resetSheet: () => void;
}

// create call from origin/main
export const useCharacter = create<CharacterState>((set) => ({
  sheet: initialSheet,
  class: undefined,
  subclass: undefined,
  setClass: (className, subclassName) =>
    set((state) => ({
      class: className,
      subclass: subclassName,
      sheet: {
        ...state.sheet,
        classId: className, // Assuming className is suitable for classId
        subclassId: subclassName, // Assuming subclassName is suitable for subclassId
      },
    })),
  updateSheet: (changes) =>
    set((state) => {
      const newSheetState = typeof changes === 'function' ? changes(state.sheet) : changes;
      return { sheet: { ...state.sheet, ...newSheetState } };
    }),
  resetSheet: () => set({ sheet: initialSheet }),
}));
