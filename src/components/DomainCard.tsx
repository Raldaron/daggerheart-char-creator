import { forwardRef } from 'react'

export interface DomainCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  description: string
  cost: number
  selected?: boolean
}

const DomainCard = forwardRef<HTMLDivElement, DomainCardProps>(
  (
    { name, description, cost, selected, className = '', ...rest },
    ref,
  ) => {
    const base = 'rounded border p-4 cursor-pointer flex flex-col gap-1 transition-colors'
    const active = 'bg-blue-50 border-blue-500'
    const inactive = 'border-gray-300'
    const classes = `${base} ${selected ? active : inactive} ${className}`
    return (
      <div ref={ref} className={classes} {...rest}>
        <div className="font-semibold">{name}</div>
        <p className="text-sm">{description}</p>
        <div className="text-xs mt-1">Cost: {cost}</div>
      </div>
    )
  },
)

DomainCard.displayName = 'DomainCard'
export default DomainCard
