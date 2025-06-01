export interface CharacterSummary {
  id: string
  name: string
  classId: string
}

export interface SheetConnections {
  [targetId: string]: string
}
