import { useState } from 'react'
import Stepper from './components/Stepper'
import './App.css'

function App() {
  const [step, setStep] = useState(0)

  return (
    <div className="p-4">
      <Stepper currentStep={step} onStepChange={setStep} />
      <div className="mt-4 text-center">Current step: {step + 1}</div>
    </div>
  )
}

export default App
