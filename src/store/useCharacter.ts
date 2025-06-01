import { create } from 'zustand';

// Combined CharacterSheet interface
export interface CharacterSheet {
  // Fields from origin/main
  level: number;
  inventory: string[];
  equipment?: {
    primaryWeapon?: unknown; // Consider using more specific types if available
    secondaryWeapon?: unknown | null;
    armor?: unknown;
    damageRoll?: string;
    armorScore?: number;
  };
  // Fields from HEAD (codex/implement-level-1-domain-card-selection)
  classId: string | null;
  subclassId: string | null;
  domainCards: string[];
}

interface CharacterState {
  sheet: CharacterSheet; // Single source of truth for sheet data
  class?: string; // From HEAD, potentially display name for class
  subclass?: string; // From HEAD, potentially display name for subclass
  setClass: (className: string, subclassName: string) => void; // From HEAD
  updateSheet: (changes: Partial<CharacterSheet> | ((prevState: CharacterSheet) => Partial<CharacterSheet>)) => void; // Combined
}

export const useCharacter = create<CharacterState>((set) => ({
  sheet: {
    // Default values from origin/main
    level: 1,
    inventory: [],
    // equipment is optional and was not in origin/main's initial sheet values explicitly
    // Default values from HEAD
    classId: null,
    subclassId: null,
    domainCards: [],
  },
  class: undefined, // From HEAD
  subclass: undefined, // From HEAD
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
}));
