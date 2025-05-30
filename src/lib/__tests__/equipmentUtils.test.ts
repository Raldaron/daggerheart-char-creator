import { describe, it, expect } from 'vitest';
import equipment from '../equipment.json';
import { getWeaponDamage, getArmorThresholds, validateEquipmentSelection } from '../equipmentUtils';

const broadsword = equipment.weapons.find(w => w.name === 'Broadsword')!;
const greatsword = equipment.weapons.find(w => w.name === 'Greatsword')!;
const leather = equipment.armors.find(a => a.name === 'Leather Armor')!;

describe('getWeaponDamage', () => {
  it('returns weapon die plus proficiency', () => {
    expect(getWeaponDamage(broadsword, 2)).toBe('d8 + 2');
    expect(getWeaponDamage(greatsword, 3)).toBe('d8 + 3');
  });
});

describe('getArmorThresholds', () => {
  it('adds level to base threshold', () => {
    expect(getArmorThresholds(leather, 4)).toBe(leather.baseThreshold + 4);
  });
});

describe('validateEquipmentSelection', () => {
  it('valid with single weapon and armor', () => {
    expect(validateEquipmentSelection([broadsword], leather)).toBe(true);
  });

  it('invalid without weapons', () => {
    expect(validateEquipmentSelection([], leather)).toBe(false);
  });

  it('invalid with more than two weapons', () => {
    expect(
      validateEquipmentSelection([broadsword, broadsword, greatsword], leather),
    ).toBe(false);
  });

  it('invalid when two-handed weapon plus another weapon', () => {
    expect(validateEquipmentSelection([greatsword, broadsword], leather)).toBe(
      false,
    );
  });

  it('invalid without armor', () => {
    expect(validateEquipmentSelection([broadsword], null)).toBe(false);
  });

  it('valid with two one-handed weapons', () => {
    expect(validateEquipmentSelection([broadsword, broadsword], leather)).toBe(
      true,
    );
  });
});
