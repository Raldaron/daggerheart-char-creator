import { useEffect, useState } from 'react'
import { calcCoreStats } from '../../utils/coreStats'

const Step4_CoreStats = () => {
  // For now core stats are calculated locally using a placeholder class.
  // In a fuller implementation these values would come from app state.
  const [coreStats] = useState(() =>
    calcCoreStats({ classId: 'warrior', level: 1 })
  )
  const armorScore = null

  const [markedHP, setMarkedHP] = useState<boolean[]>([])

  useEffect(() => {
    setMarkedHP(Array(coreStats.hitPoints).fill(false))
  }, [coreStats.hitPoints])

  const toggleHp = (idx: number) => {
    setMarkedHP((prev) => prev.map((m, i) => (i === idx ? !m : m)))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="border rounded p-4 text-center">
          <div className="text-sm uppercase text-gray-500">Level</div>
          <div className="text-2xl font-semibold">{coreStats.level}</div>
        </div>
        <div className="border rounded p-4 text-center">
          <div className="text-sm uppercase text-gray-500">Evasion</div>
          <div className="text-2xl font-semibold">{coreStats.evasion}</div>
        </div>
        <div className="border rounded p-4 text-center">
          <div className="text-sm uppercase text-gray-500">Hit Points</div>
          <div className="text-2xl font-semibold">{coreStats.hitPoints}</div>
          <div className="flex justify-center gap-1 mt-2">
            {markedHP.map((m, i) => (
              <span
                key={i}
                className="cursor-pointer text-xl select-none"
                onClick={() => toggleHp(i)}
              >
                {m ? '⬛' : '⬜'}
              </span>
            ))}
          </div>
        </div>
        <div className="border rounded p-4 text-center">
          <div className="text-sm uppercase text-gray-500">Stress Slots</div>
          <div className="text-2xl font-semibold">{coreStats.stressSlots}</div>
        </div>
        <div className="border rounded p-4 text-center">
          <div className="text-sm uppercase text-gray-500">Hope</div>
          <div className="text-2xl font-semibold">{coreStats.hope}</div>
        </div>
        <div className="border rounded p-4 text-center">
          <div className="text-sm uppercase text-gray-500">Armor</div>
          <div className="text-2xl font-semibold">{armorScore ?? '—'}</div>
        </div>
      </div>
      <div className="flex justify-between">
        <button className="px-4 py-2 bg-gray-200 rounded">Back</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
      </div>
    </div>
  )
}

export default Step4_CoreStats
