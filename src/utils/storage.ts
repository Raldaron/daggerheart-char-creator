// Basic localStorage helpers for character sheets

export interface SheetMeta {
  id: string
  name: string
  classId: string
  updatedAt: string
}

const INDEX_KEY = 'dh-sheets-index'

const loadIndex = (): SheetMeta[] => {
  try {
    return JSON.parse(localStorage.getItem(INDEX_KEY) ?? '[]') as SheetMeta[]
  } catch {
    return []
  }
}

const saveIndex = (index: SheetMeta[]) => {
  localStorage.setItem(INDEX_KEY, JSON.stringify(index))
}

export function listSheets(): SheetMeta[] {
  return loadIndex()
}

export function loadSheet(id: string): unknown {
  const raw = localStorage.getItem(`dh-sheet-${id}`)
  return raw ? JSON.parse(raw) : null
}

export function deleteSheet(id: string): void {
  const index = loadIndex().filter((s) => s.id !== id)
  saveIndex(index)
  localStorage.removeItem(`dh-sheet-${id}`)
}

export async function importSheet(file: File): Promise<void> {
  const text = await file.text()
  const sheet = JSON.parse(text) as SheetMeta
  const index = loadIndex().filter((s) => s.id !== sheet.id)
  index.push({
    id: sheet.id,
    name: sheet.name,
    classId: sheet.classId,
    updatedAt: sheet.updatedAt ?? new Date().toISOString(),
  })
  saveIndex(index)
  localStorage.setItem(`dh-sheet-${sheet.id}`, JSON.stringify(sheet))
}

export function exportAll(): void {
  const sheets = loadIndex().map((m) => loadSheet(m.id))
  const blob = new Blob([JSON.stringify(sheets, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'sheets.json'
  a.click()
  URL.revokeObjectURL(url)
}

