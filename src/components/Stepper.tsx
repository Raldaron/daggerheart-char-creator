import React from 'react'

export interface StepperProps {
  currentStep: number
  onStepChange: (step: number) => void
}

const steps = [
  'Class',
  'Heritage',
  'Traits',
  'Attributes',
  'Abilities',
  'Background',
  'Advancement',
  'Gear',
  'Connections',
]

export default function Stepper({ currentStep, onStepChange }: StepperProps) {
  return (
    <nav className="flex flex-row overflow-x-auto md:flex-col">
      {steps.map((label, idx) => {
        const active = idx === currentStep
        return (
          <button
            key={label}
            type="button"
            onClick={() => onStepChange(idx)}
            className={
              'flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 whitespace-nowrap border-b md:border-b-0 md:border-l ' +
              (active
                ? 'text-blue-600 font-semibold border-blue-600'
                : 'text-gray-600 border-transparent hover:text-gray-900')
            }
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full border text-xs">
              {idx + 1}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
