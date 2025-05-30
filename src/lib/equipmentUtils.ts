export interface Weapon {
  name: string;
  tier: number;
  burden: string;
  damageByProficiency: string[];
}

export interface Armor {
  name: string;
  baseMajor: number;
  baseSevere: number;
}

export const getWeaponDamage = (
  weapon: Weapon,
  proficiency: number
): string => {
  const index = Math.max(0, Math.min(proficiency - 1, weapon.damageByProficiency.length - 1));
  return weapon.damageByProficiency[index];
};

export const getArmorThresholds = (
  armor: Armor,
  level: number
): { major: number; severe: number } => ({
  major: armor.baseMajor + level,
  severe: armor.baseSevere + level,
});

export const validateEquipmentSelection = (
  primary: Weapon | null,
  secondary: Weapon | null
): string[] => {
  const errors: string[] = [];

  if (!primary) {
    errors.push('Primary weapon is required.');
  } else {
    if (primary.tier !== 1) {
      errors.push('Primary weapon must be tier 1.');
    }
    if (primary.burden === 'Two-Handed' && secondary) {
      errors.push('Two-handed weapons cannot have a secondary weapon.');
    }
  }

  if (secondary) {
    if (secondary.burden !== 'One-Handed') {
      errors.push('Secondary weapon must be one-handed.');
    }
  }

  return errors;
};
