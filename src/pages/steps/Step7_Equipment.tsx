import { useEffect, useState } from 'react'
import equipmentData from '@/data/equipment.json'
import weaponsExtra from '@/data/weapons.json'
import { useCharacter } from '../../store/useCharacter'

function EquipmentStep() {
  const { sheet, updateSheet } = useCharacter()

  const weapons = [...equipmentData.weapons, ...weaponsExtra]
  const primaryList = weapons.filter((w) => w.primary === true && w.tier === 1)
  const secondaryList = weapons.filter((w) => w.primary === false && w.tier === 1)
  const armorList = equipmentData.armor.filter((a) => a.tier === 1)

  const [primaryId, setPrimaryId] = useState<string | null>(null)
  const [secondaryId, setSecondaryId] = useState<string | null>(null)
  const [armorId, setArmorId] = useState<string | null>(null)

  useEffect(() => {
    if (sheet.inventory.length === 0) {
      sheet.inventory.push(...equipmentData.startingKit)
      updateSheet({ inventory: [...sheet.inventory] })
    }
  }, [])

  const selectedPrimary = primaryList.find((w) => w.id === primaryId)
  const selectedSecondary = secondaryList.find((w) => w.id === secondaryId)
  const selectedArmor = armorList.find((a) => a.id === armorId)

  const showSecondary = selectedPrimary?.hands === 1
  const secondaryOptions = secondaryList.filter(
    (w) => w.hands === 1 && w.id !== selectedPrimary?.id,
  )

  useEffect(() => {
    if (!selectedPrimary || !selectedArmor) return
    if (showSecondary && !selectedSecondary) return

    const prof = sheet.level
    const dmgDie = selectedPrimary.damageDie
    const damageRoll = `1${dmgDie}+${prof}`
    const armorScore =
      selectedArmor.armorScore +
      (selectedSecondary?.tags?.includes('defensive') ? 1 : 0)

    updateSheet({
      equipment: {
        primaryWeapon: selectedPrimary,
        secondaryWeapon: showSecondary ? selectedSecondary : null,
        armor: selectedArmor,
        damageRoll,
        armorScore,
      },
    })
  }, [primaryId, secondaryId, armorId, sheet.level])

  const disabledNext = !selectedPrimary || !selectedArmor || (showSecondary && !selectedSecondary)

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-bold">Starting Equipment</h2>

      <div className="flex flex-col gap-1">
        <span className="font-semibold">Primary Weapon</span>
        {primaryList.map((w) => (
          <label key={w.id} className="flex items-center gap-2">
            <input
              type="radio"
              name="primary"
              checked={primaryId === w.id}
              onChange={() => {
                setPrimaryId(w.id)
                setSecondaryId(null)
              }}
            />
            {w.name}
          </label>
        ))}
      </div>

      {showSecondary && (
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Secondary Weapon</span>
          {secondaryOptions.map((w) => (
            <label key={w.id} className="flex items-center gap-2">
              <input
                type="radio"
                name="secondary"
                checked={secondaryId === w.id}
                onChange={() => setSecondaryId(w.id)}
              />
              {w.name}
            </label>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <span className="font-semibold">Armor</span>
        {armorList.map((a) => (
          <label key={a.id} className="flex items-center gap-2">
            <input
              type="radio"
              name="armor"
              checked={armorId === a.id}
              onChange={() => setArmorId(a.id)}
            />
            {a.name}
          </label>
        ))}
      </div>

      <div className="flex justify-between pt-2">
        <button className="px-4 py-2 border rounded">Back</button>
        <button
          className="px-4 py-2 border rounded bg-blue-600 text-white disabled:opacity-50"
          disabled={disabledNext}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default EquipmentStep
