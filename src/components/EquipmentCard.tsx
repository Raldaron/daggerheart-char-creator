import { forwardRef } from 'react'

export interface EquipmentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  trait?: string
  range?: string
  damage?: string
  feature?: string
  checked?: boolean
}

const EquipmentCard = forwardRef<HTMLDivElement, EquipmentCardProps>(
  (
    {
      name,
      trait,
      range,
      damage,
      feature,
      checked,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const base =
      'rounded border p-4 cursor-pointer flex flex-col gap-2 transition-colors'
    const active = 'bg-blue-50 border-blue-500'
    const inactive = 'border-gray-300'
    const classes = `${base} ${checked ? active : inactive} ${className}`

    return (
      <div ref={ref} className={classes} {...rest}>
        <div className="font-semibold">{name}</div>
        <div className="flex flex-wrap gap-1 text-xs">
          {trait && (
            <span className="rounded bg-gray-200 px-1">Trait: {trait}</span>
          )}
          {range && (
            <span className="rounded bg-gray-200 px-1">Range: {range}</span>
          )}
          {damage && (
            <span className="rounded bg-gray-200 px-1">Damage: {damage}</span>
          )}
          {feature && (
            <span className="rounded bg-gray-200 px-1">Feature: {feature}</span>
          )}
        </div>
      </div>
    )
  },
)

EquipmentCard.displayName = 'EquipmentCard'
export default EquipmentCard
