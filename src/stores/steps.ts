import { create } from 'zustand'

export interface StepState {
  step: number
  nextStep: () => void
  prevStep: () => void
}

export const useStepStore = create<StepState>((set) => ({
  step: 1,
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
}))
