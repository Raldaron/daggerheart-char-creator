import { useState } from 'react'
import classesData from '../../../data/classes.json'
import domainsData from '../../../data/domains.json'
import domainCardsData from '../../../data/domainCards.json'
import { useCharacter } from '../../store/useCharacter'
import DomainCard from '../../components/DomainCard'
import type { DomainCard as DomainCardType } from '../../types/daggerheart'

interface ClassEntry {
  id: string
  domains: string[]
}

interface Domain {
  id: string
  name: string
}

export default function DomainsStep() {
  const { sheet, updateSheet } = useCharacter()
  const cls = (classesData as ClassEntry[]).find((c) => c.id === sheet.classId)
  const allowedDomainIds = cls ? cls.domains.map((d) => d.toLowerCase()) : []

  const level1Cards = (domainCardsData as DomainCardType[]).filter(
    (c) => allowedDomainIds.includes(c.domainId) && c.level === 1,
  )

  const cardsByDomain = level1Cards.reduce<Record<string, DomainCardType[]>>((
    acc,
    card,
  ) => {
    if (!acc[card.domainId]) acc[card.domainId] = []
    acc[card.domainId].push(card)
    return acc
  }, {})

  const [chosen, setChosen] = useState<string[]>(sheet.domainCards)

  const toggle = (id: string) => {
    setChosen((prev) => {
      let next: string[]
      if (prev.includes(id)) {
        next = prev.filter((c) => c !== id)
      } else if (prev.length >= 2) {
        next = [...prev.slice(1), id]
      } else {
        next = [...prev, id]
      }
      updateSheet({ domainCards: next })
      return next
    })
  }

  const picked = chosen.length

  return (
    <div className="space-y-4">
      <div className="text-right font-semibold">Picked {picked} / 2</div>
      {Object.entries(cardsByDomain).map(([domainId, cards]) => {
        const domain = (domainsData as Domain[]).find((d) => d.id === domainId)
        return (
          <div key={domainId} className="space-y-2">
            <h3 className="font-bold">{domain?.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {cards.map((card) => (
                <DomainCard
                  key={card.id}
                  name={card.name}
                  description={card.description}
                  cost={card.cost}
                  selected={chosen.includes(card.id)}
                  onClick={() => toggle(card.id)}
                />
              ))}
            </div>
          </div>
        )
      })}
      <div className="flex justify-between pt-4">
        <button className="px-4 py-2 border rounded">Back</button>
        <button
          className="px-4 py-2 border rounded bg-indigo-600 text-white disabled:opacity-50"
          disabled={picked !== 2}
        >
          Next
        </button>
      </div>
    </div>
  )
}
