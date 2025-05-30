export type Trait =
  | 'Agility'
  | 'Strength'
  | 'Finesse'
  | 'Instinct'
  | 'Presence'
  | 'Knowledge'

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
