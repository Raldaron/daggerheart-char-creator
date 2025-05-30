import { create } from 'zustand'
import { EquipmentSelection, validateEquipmentSelection } from './validateEquipmentSelection'

export interface CharacterStore {
  equipment: EquipmentSelection
  setPrimary: (id: string) => void
  setSecondary: (id: string | null) => void
  setArmor: (id: string) => void
  setPotion: (id: string) => void
  coreEquipmentValid: () => boolean
}

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  equipment: {
    primaryId: null,
    secondaryId: null,
    armorId: null,
    potionId: null,
  },
  setPrimary: (id: string) =>
    set((state) => ({
      equipment: { ...state.equipment, primaryId: id },
    })),
  setSecondary: (id: string | null) =>
    set((state) => ({
      equipment: { ...state.equipment, secondaryId: id },
    })),
  setArmor: (id: string) =>
    set((state) => ({
      equipment: { ...state.equipment, armorId: id },
    })),
  setPotion: (id: string) =>
    set((state) => ({
      equipment: { ...state.equipment, potionId: id },
    })),
  coreEquipmentValid: () => validateEquipmentSelection(get().equipment),
}))
