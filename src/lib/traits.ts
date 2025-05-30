export const TRAITS = ["Body", "Mind", "Heart"] as const;
export type Trait = typeof TRAITS[number];

export const MODIFIERS = [2, 1, 0, -1, -2] as const;

export interface Validation {
  ok: boolean;
  error?: string;
}

function count(arr: readonly number[]): Record<number, number> {
  const out: Record<number, number> = {};
  for (const v of arr) {
    out[v] = (out[v] ?? 0) + 1;
  }
  return out;
}

export function validateTraits(assignments: Record<Trait, number | null>): Validation {
  for (const trait of TRAITS) {
    if (assignments[trait] == null) {
      return { ok: false, error: 'All traits must have a modifier.' };
    }
  }

  const required = count(MODIFIERS);
  for (const val of Object.values(assignments)) {
    if (val == null) continue;
    if (!(val in required)) {
      return { ok: false, error: 'Unknown modifier used.' };
    }
    required[val]! -= 1;
  }

  if (Object.values(required).some((n) => n !== 0)) {
    return { ok: false, error: 'All modifiers must be used exactly once.' };
  }
  return { ok: true };
}
