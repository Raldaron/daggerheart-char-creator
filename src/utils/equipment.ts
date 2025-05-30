import data from '../data/equipment.json';

export const EQUIPMENT = { ...data } as const;

export type Weapon = typeof EQUIPMENT.weapons[number];
export type Armor = typeof EQUIPMENT.armor[number];
export type GearItem = typeof EQUIPMENT.gear[number];

export function calcDamageRoll(weapon: Weapon, proficiency: number): string {
  const die = weapon.die;
  return `1d${die} ${proficiency ? '+' + proficiency : ''}`.trim();
}

export function calcDamageThresholds(
  armor: Armor,
  level: number,
): { minor: number; major: number } {
  return {
    minor: armor.minor + level,
    major: armor.major + level,
  };
}

export function isValidWeaponCombo(
  primary: Weapon | null,
  secondary: Weapon | null,
): boolean {
  if (primary && primary.hands === 2) {
    return secondary === null;
  }
  if (primary && secondary) {
    return primary.hands === 1 && secondary.hands === 1;
  }
  return false;
}

export const STARTING_KIT = EQUIPMENT.startingKit;
