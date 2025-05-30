import { useState } from 'react'
import * as Icons from 'lucide-react'
import classesData from '../../../data/classes.json'
import { useCharacter } from '../../store/useCharacter'

type ClassItem = {
  id: string
  name: string
  blurb: string
  icon: keyof typeof Icons
  subclasses: string[]
}

const classes = classesData as ClassItem[]

export default function Step1_Class() {
  const [open, setOpen] = useState<string | null>(null)
  const { class: selectedClass, subclass, setClass } = useCharacter()

  const handleSelect = (cls: ClassItem, sub: string) => {
    setClass(cls.id, sub)
  }

  return (
    <div className="p-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {classes.map((cls) => {
          const Icon = (Icons as any)[cls.icon] || Icons.Circle
          const isOpen = open === cls.id
          return (
            <div key={cls.id} className="border rounded p-4 shadow">
              <button
                type="button"
                className="flex items-center gap-2 w-full text-left"
                onClick={() => setOpen(isOpen ? null : cls.id)}
              >
                <Icon className="w-6 h-6" />
                <div>
                  <div className="font-bold">{cls.name}</div>
                  <p className="text-sm text-gray-600">{cls.blurb}</p>
                </div>
              </button>
              {isOpen && (
                <div className="mt-2">
                  {cls.subclasses.map((sub) => (
                    <label key={sub} className="flex items-center gap-2 mt-1">
                      <input
                        type="radio"
                        name="subclass"
                        checked={selectedClass === cls.id && subclass === sub}
                        onChange={() => handleSelect(cls, sub)}
                      />
                      <span>{sub}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-4 text-right">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={!subclass}
          onClick={() => console.log('Next step')}
        >
          Next
        </button>
      </div>
    </div>
  )
}
