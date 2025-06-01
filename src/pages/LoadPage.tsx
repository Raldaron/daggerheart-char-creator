
/***  Codex prompt: create src/pages/LoadPage.tsx  ***

Goal: Display saved characters and manage import/export.

Data helpers
  import { listSheets, deleteSheet, importSheet, exportAll, loadSheet } from '@/utils/storage';

Requirements
1. React FC `LoadPage`.
2. Local state `sheets = listSheets()` (id, name, classId, updatedAt).
3. Render a table:
      <thead><tr><th>Name</th><th>Class</th><th>Last Edited</th><th></th></tr></thead>
      <tbody>…
         <tr key=id>
            <td>{name}</td><td>{classLabel}</td><td>{dayjs(updatedAt).format('YYYY-MM-DD')}</td>
            <td>
               <button onClick={()=>edit(id)}>Edit</button>
               <button onClick={()=>remove(id)}>Delete</button>
            </td>
         </tr>
4. `edit(id)` loads sheet into CharacterContext (use `loadSheet(id)`) then navigate(`/create/step/5`).
5. `remove` asks confirm then calls `deleteSheet(id)` and refreshes list.
6. File upload `<input type="file" accept="application/json">` → `importSheet(file)` then refresh.
7. “Export All” button triggers `exportAll()` (creates downloadable zip).
8. If `sheets.length===0`, show empty-state message + link to “Create”.
9. Export default.

Styling: CSS Grid table `.loadTable { width:100%; border-collapse:collapse; }`.

***/

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import classesData from '../data/classes.json'
import {
  listSheets,
  deleteSheet,
  importSheet,
  exportAll,
  loadSheet,
} from '../utils/storage'

type SheetMeta = {
  id: string
  name: string
  classId: string
  updatedAt: string
}

const classMap = (classesData as { id: string; name: string }[]).reduce(
  (acc, cls) => {
    acc[cls.id] = cls.name
    return acc
  },
  {} as Record<string, string>,
)

function formatDate(date: string) {
  return new Date(date).toISOString().slice(0, 10)
}

const LoadPage: React.FC = () => {
  const navigate = useNavigate()
  const [sheets, setSheets] = useState<SheetMeta[]>(() => listSheets())

  const refresh = () => setSheets(listSheets())

  const edit = (id: string) => {
    loadSheet(id)
    navigate('/create/step/5')
  }

  const remove = (id: string) => {
    if (window.confirm('Delete this character?')) {
      deleteSheet(id)
      refresh()
    }
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await importSheet(file)
      e.target.value = ''
      refresh()
    }
  }

  if (sheets.length === 0) {
    return (
      <div className="p-4">
        <p className="mb-2">No saved characters.</p>
        <Link to="/create" className="text-blue-600 underline">
          Create one
        </Link>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      <table className="loadTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Last Edited</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sheets.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{classMap[s.classId] ?? s.classId}</td>
              <td>{formatDate(s.updatedAt)}</td>
              <td className="flex gap-2">
                <button onClick={() => edit(s.id)} className="text-blue-600">
                  Edit
                </button>
                <button onClick={() => remove(s.id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-2">
        <input type="file" accept="application/json" onChange={handleImport} />
        <button onClick={exportAll} className="px-2 py-1 border rounded">
          Export All
        </button>
      </div>
    </div>
  )
}

export default LoadPage

