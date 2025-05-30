export const TRAITS = [
  "Agility",
  "Strength",
  "Finesse",
  "Instinct",
  "Presence",
  "Knowledge",
] as const;

export type Trait = (typeof TRAITS)[number];

export function traitKey(trait: Trait): string {
  return trait.toLowerCase();
}
