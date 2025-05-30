export interface EquipmentSelection {
  primaryId: string | null;
  secondaryId: string | null;
  armorId: string | null;
  potionId: string | null;
}

export function validateEquipmentSelection(equipment: EquipmentSelection): boolean {
  // Placeholder validation logic; ensure mandatory slots are selected
  return Boolean(equipment.primaryId && equipment.armorId && equipment.potionId);
}
