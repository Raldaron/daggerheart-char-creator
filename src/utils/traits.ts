export const TRAITS = [
  'Agility',
  'Strength',
  'Finesse',
  'Instinct',
  'Presence',
  'Knowledge',
] as const

export type Trait = (typeof TRAITS)[number]

export const MODIFIERS = [2, 1, 1, 0, 0, -1] as const

export function validateTraits(
  traits: Record<Trait, number | null>,
): { ok: boolean; error?: string } {
  for (const trait of TRAITS) {
    const value = traits[trait]
    if (value === null || value === undefined) {
      return { ok: false, error: `Trait ${trait} is missing` }
    }
  }

  const actual = TRAITS.map((t) => traits[t] as number).sort((a, b) => a - b)
  const expected = [...MODIFIERS].sort((a, b) => a - b)

  for (let i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) {
      return {
        ok: false,
        error: `Trait modifiers must match ${MODIFIERS.join(', ')}`,
      }
    }
  }

  return { ok: true }
}
