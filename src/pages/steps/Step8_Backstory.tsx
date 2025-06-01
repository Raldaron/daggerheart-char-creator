import { useState, useEffect } from 'react'
import classes from '@/data/classes.json'
import { useSheetStore, BackgroundAnswers } from '../../stores/sheet'

export default function Step8_Backstory() {
  const { sheet, updateSheet } = useSheetStore((s) => ({
    sheet: s.sheet,
    updateSheet: s.updateSheet,
  }))

  const [answers, setAnswers] = useState<BackgroundAnswers>(
    sheet.background.answers ?? {}
  )
  const [notes, setNotes] = useState(sheet.background.notes)

  const currentClass = classes.find((c) => c.id === sheet.classId)

  const questions = currentClass
    ? [
        `Why did you choose the path of a ${currentClass.name}?`,
        `Which personal item do you treasure?  (e.g., ${currentClass.classItems})`,
        `What fear or hope drives your ${currentClass.name}?`,
      ]
    : []

  const handleAnswerChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    updateSheet({ background: { answers, notes } })
  }, [answers, notes, updateSheet])

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Step 8: Backstory</h2>
      {questions.map((q, idx) => (
        <label key={idx} className="block space-y-1">
          <span>{q}</span>
          <textarea
            className="w-full border rounded p-2"
            value={answers[String(idx)] ?? ''}
            onChange={(e) => handleAnswerChange(String(idx), e.target.value)}
          />
        </label>
      ))}
      <label className="block space-y-1">
        <span>Free-form notes</span>
        <textarea
          className="w-full border rounded p-2"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>
      <div className="flex justify-between">
        <button className="px-4 py-2 border rounded">Back</button>
        <button className="px-4 py-2 border rounded">Next</button>
      </div>
    </div>
  )
}
