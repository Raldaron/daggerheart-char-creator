import { create } from 'zustand'
import type { CharacterSummary } from '../types/party'

interface PartyState {
  party: CharacterSummary[]
  updateCharacter: (id: string, partial: Partial<CharacterSummary>) => void
}

export const useParty = create<PartyState>((set) => ({
  party: [],
  updateCharacter: (id, partial) =>
    set((state) => ({
      party: state.party.map((c) => (c.id === id ? { ...c, ...partial } : c)),
    })),
}))

