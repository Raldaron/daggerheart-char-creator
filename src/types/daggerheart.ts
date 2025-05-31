export type Trait =
  | 'Agility'
  | 'Strength'
  | 'Finesse'
  | 'Instinct'
  | 'Presence'
  | 'Knowledge'

// Utility helper used by the character store to map trait names to record keys.
// Currently this just returns the trait value unchanged but keeping it as a
// function makes it easy to change the keying strategy later without touching
// store code.
export const traitKey = (trait: Trait) => trait

export interface ClassOption {
  id: string
  name: string
  description?: string
}

export interface HeritageOption {
  id: string
  name: string
  description?: string
}

export interface DomainCard {
  id: string
  name: string
  description?: string
}

export interface Character {
  traits: Record<Trait, number>
  name?: string
  pronouns?: string
  classOption?: ClassOption
  heritageOption?: HeritageOption
  domainCards?: DomainCard[]
  level?: number
}
