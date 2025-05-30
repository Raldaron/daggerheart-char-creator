import React from 'react'

export interface Trait {
  id: string
  label: string
}

export interface TraitRowProps {
  trait: Trait
  value: number | null
  onValueChange: (newVal: number | null) => void
}

export default function TraitRow({ trait, value, onValueChange }: TraitRowProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const text = e.dataTransfer.getData('text/plain')
    const num = parseInt(text, 10)
    if (!Number.isNaN(num)) {
      onValueChange(num)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleClick = () => {
    // Clear value on click
    onValueChange(null)
  }

  return (
    <div
      className="flex items-center justify-between px-2 py-1 border-b cursor-pointer select-none"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      <span>{trait.label}</span>
      <span className="font-bold">{value ?? '-'}</span>
    </div>
  )
}
