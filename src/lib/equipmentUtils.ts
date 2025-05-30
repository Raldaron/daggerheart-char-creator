export interface Weapon {
  id: string;
  name: string;
  damageDie: string;
  hands: number;
}

export interface Armor {
  id: string;
  name: string;
  baseThreshold: number;
}

/**
 * Returns a damage expression based on the weapon die and proficiency modifier.
 */
export function getWeaponDamage(weapon: Weapon, proficiency: number): string {
  return `${weapon.damageDie} + ${proficiency}`;
}

/**
 * Adds the character level to the armor's base threshold.
 */
export function getArmorThresholds(armor: Armor, level: number): number {
  return armor.baseThreshold + level;
}

/**
 * Validates that the selected weapons and armor meet simple equipment rules.
 */
export function validateEquipmentSelection(
  weapons: Weapon[],
  armor: Armor | null,
): boolean {
  if (weapons.length === 0) return false;
  if (weapons.length > 2) return false;

  const twoHanded = weapons.filter(w => w.hands === 2);
  if (twoHanded.length > 1) return false;
  if (twoHanded.length === 1 && weapons.length > 1) return false;

  if (!armor) return false;

  return true;
}
