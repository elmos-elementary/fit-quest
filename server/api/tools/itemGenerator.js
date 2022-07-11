const generateItem = (characterLevel) => {
  // Roll Rarity
  let tier
  const rarityRoll = Math.ceil(Math.random() * 100)
  if (rarityRoll <= 50) {
    tier = 'common'
  } else if (rarityRoll <= 85) {
    tier = 'uncommon'
  } else if (rarityRoll <= 95) {
    tier = 'legendary'
  } else {
    tier = 'godly'
  }

  // Roll Item Type
  const itemType = ['weapon', 'head', 'chest', 'leg', 'ring'][
    Math.floor(Math.random() * 5)
  ]
  let item
  switch (itemType) {
    case 'weapon':
      item = ['Sword', 'Axe', 'Bow', 'Staff'][Math.floor(Math.random() * 4)]
      break
    case 'head':
      item = ['Helmet', 'Coil', 'Hood'][Math.floor(Math.random() * 3)]
      break
    case 'chest':
      item = ['Chestplate', 'Chaps', 'Robe'][Math.floor(Math.random() * 3)]
      break
    case 'leg':
      item = ['Leggings', 'Cloak', 'Skirt'][Math.floor(Math.random() * 3)]
      break
    case 'ring':
      item = 'Ring'
      break
  }

  // Roll Item Name
  const adjectives = [
    'Power',
    'Charming',
    'Death',
    'Pestilence',
    'Doom',
    'Curses',
    'Wealth',
    'Hunger',
    'Damnation',
    'Mending',
    'Sanctity',
    'Lightness',
    'Exiles',
    'Collapse',
    'Prosperity',
    'Woe',
    'Malediction',
    'Silence',
    'Worship',
    'the Occult',
    'Storms',
    'Light',
    'Genesis',
    'Infinity',
    'Enthrallment',
    'Judgment',
    'Peace',
    'Eternity',
    'Chaos',
    'Lightning',
    'Ice',
    'Fire',
    'Darkness',
    'Water',
    'Woe',
    'Pain',
    'Charming',
    'Dragons',
    'the Void',
    'the Heavens',
    'Greed',
    'Life',
  ]

  // Roll Item Level
  const itemLevel = characterLevel + (Math.ceil(Math.random() * 5) - 3)

  // Roll Combat Skill
  let combatSkill
  switch (tier) {
    case 'common':
      combatSkill = Math.ceil(itemLevel * (Math.random() * 0.1 - 0.11 + 1))
      break
    case 'uncommon':
      combatSkill = Math.floor(itemLevel * (Math.random() * 0.06 + 0.05 + 1))
      break
    case 'legendary':
      combatSkill = Math.floor(itemLevel * (Math.random() * 0.06 + 0.1 + 1))
      break
    case 'godly':
      combatSkill = Math.floor(itemLevel * (Math.random() * 0.16 + 0.15 + 1))
      break
  }

  // Roll Bonuses
  let expBonus = 0
  let coinBonus = 0
  let chestLevelBonus = 0
  let backLevelBonus = 0
  let armsLevelBonus = 0
  let abdominalsLevelBonus = 0
  let legsLevelBonus = 0
  let shouldersLevelBonus = 0
  let cardioLevelBonus = 0
  let stretchingLevelBonus = 0
  switch (tier) {
    case 'common':
      if (Math.ceil(Math.random() * 100 === 1)) {
        expBonus = Math.ceil(Math.random() * 5) // +1-5%
      }
      if (Math.ceil(Math.random() * 100 === 1)) {
        coinBonus = Math.ceil(Math.random() * 5) // +1-5%
      }
      if (Math.ceil(Math.random() * 100 === 1)) {
        chestLevelBonus = Math.ceil(Math.random() * 5) // +1-5%
      }
      if (Math.ceil(Math.random() * 100 === 1)) {
        backLevelBonus = Math.ceil(Math.random() * 5) // +1-5%
      }
      if (Math.ceil(Math.random() * 100 === 1)) {
        armsLevelBonus = Math.ceil(Math.random() * 5) // +1-5%
      }
      if (Math.ceil(Math.random() * 100 === 1)) {
        abdominalsLevelBonus = Math.ceil(Math.random() * 5) // +1-5%
      }
      if (Math.ceil(Math.random() * 100 === 1)) {
        legsLevelBonus = Math.ceil(Math.random() * 5) // +1-5%
      }
      if (Math.ceil(Math.random() * 100 === 1)) {
        shouldersLevelBonus = Math.ceil(Math.random() * 5) // +1-5%
      }
      if (Math.ceil(Math.random() * 100 === 1)) {
        cardioLevelBonus = Math.ceil(Math.random() * 5) // +1-5%
      }
      if (Math.ceil(Math.random() * 100 === 1)) {
        stretchingLevelBonus = Math.ceil(Math.random() * 5) // +1-5%
      }
      break
    case 'uncommon':
      if (Math.ceil(Math.random() * 100 <= 5)) {
        expBonus = Math.ceil(Math.random() * 6 + 4) // +5-10%
      }
      if (Math.ceil(Math.random() * 100 <= 5)) {
        coinBonus = Math.ceil(Math.random() * 6 + 4) // +5-10%
      }
      if (Math.ceil(Math.random() * 100 <= 5)) {
        chestLevelBonus = Math.ceil(Math.random() * 6 + 4) // +5-10%
      }
      if (Math.ceil(Math.random() * 100 <= 5)) {
        backLevelBonus = Math.ceil(Math.random() * 6 + 4) // +5-10%
      }
      if (Math.ceil(Math.random() * 100 <= 5)) {
        armsLevelBonus = Math.ceil(Math.random() * 6 + 4) // +5-10%
      }
      if (Math.ceil(Math.random() * 100 <= 5)) {
        abdominalsLevelBonus = Math.ceil(Math.random() * 6 + 4) // +5-10%
      }
      if (Math.ceil(Math.random() * 100 <= 5)) {
        legsLevelBonus = Math.ceil(Math.random() * 6 + 4) // +5-10%
      }
      if (Math.ceil(Math.random() * 100 <= 5)) {
        shouldersLevelBonus = Math.ceil(Math.random() * 6 + 4) // +5-10%
      }
      if (Math.ceil(Math.random() * 100 <= 5)) {
        cardioLevelBonus = Math.ceil(Math.random() * 6 + 4) // +5-10%
      }
      if (Math.ceil(Math.random() * 100 <= 5)) {
        stretchingLevelBonus = Math.ceil(Math.random() * 6 + 4) // +5-10%
      }
      break
    case 'legendary':
      if (Math.ceil(Math.random() * 100 <= 25)) {
        expBonus = Math.ceil(Math.random() * 6 + 9) // +10-15%
      }
      if (Math.ceil(Math.random() * 100 <= 25)) {
        coinBonus = Math.ceil(Math.random() * 6 + 9) // +10-15%
      }
      if (Math.ceil(Math.random() * 100 <= 25)) {
        chestLevelBonus = Math.ceil(Math.random() * 6 + 9) // +10-15%
      }
      if (Math.ceil(Math.random() * 100 <= 25)) {
        backLevelBonus = Math.ceil(Math.random() * 6 + 9) // +10-15%
      }
      if (Math.ceil(Math.random() * 100 <= 25)) {
        armsLevelBonus = Math.ceil(Math.random() * 6 + 9) // +10-15%
      }
      if (Math.ceil(Math.random() * 100 <= 25)) {
        abdominalsLevelBonus = Math.ceil(Math.random() * 6 + 9) // +10-15%
      }
      if (Math.ceil(Math.random() * 100 <= 25)) {
        legsLevelBonus = Math.ceil(Math.random() * 6 + 9) // +10-15%
      }
      if (Math.ceil(Math.random() * 100 <= 25)) {
        shouldersLevelBonus = Math.ceil(Math.random() * 6 + 9) // +10-15%
      }
      if (Math.ceil(Math.random() * 100 <= 25)) {
        cardioLevelBonus = Math.ceil(Math.random() * 6 + 9) // +10-15%
      }
      if (Math.ceil(Math.random() * 100 <= 25)) {
        stretchingLevelBonus = Math.ceil(Math.random() * 6 + 9) // +10-15%
      }
      break
    case 'godly':
      if (Math.ceil(Math.random() * 100 <= 50)) {
        expBonus = Math.ceil(Math.random() * 16 + 14) // +15-30%
      }
      if (Math.ceil(Math.random() * 100 <= 50)) {
        coinBonus = Math.ceil(Math.random() * 16 + 14) // +15-30%
      }
      if (Math.ceil(Math.random() * 100 <= 50)) {
        chestLevelBonus = Math.ceil(Math.random() * 16 + 14) // +15-30%
      }
      if (Math.ceil(Math.random() * 100 <= 50)) {
        backLevelBonus = Math.ceil(Math.random() * 16 + 14) // +15-30%
      }
      if (Math.ceil(Math.random() * 100 <= 50)) {
        armsLevelBonus = Math.ceil(Math.random() * 16 + 14) // +15-30%
      }
      if (Math.ceil(Math.random() * 100 <= 50)) {
        abdominalsLevelBonus = Math.ceil(Math.random() * 16 + 14) // +15-30%
      }
      if (Math.ceil(Math.random() * 100 <= 50)) {
        legsLevelBonus = Math.ceil(Math.random() * 16 + 14) // +15-30%
      }
      if (Math.ceil(Math.random() * 100 <= 50)) {
        shouldersLevelBonus = Math.ceil(Math.random() * 16 + 14) // +15-30%
      }
      if (Math.ceil(Math.random() * 100 <= 50)) {
        cardioLevelBonus = Math.ceil(Math.random() * 16 + 14) // +15-30%
      }
      if (Math.ceil(Math.random() * 100 <= 50)) {
        stretchingLevelBonus = Math.ceil(Math.random() * 16 + 14) // +15-30%
      }
      break
  }

  // Calculate Price
  let price
  switch (tier) {
    case 'common':
      price = Math.ceil(itemLevel * (Math.random() * 0.1 - 0.11 + 1))
      break
    case 'uncommon':
      price = Math.floor(itemLevel * (Math.random() * 0.06 + 0.05 + 1))
      break
    case 'legendary':
      price = Math.floor(itemLevel * (Math.random() * 0.11 + 0.1 + 1))
      break
    case 'godly':
      price = Math.floor(itemLevel * (Math.random() * 0.21 + 0.2 + 1))
      break
  }

  // Min Skill Requirements, currently not used
  const minChestLevel = 1
  const minBackLevel = 1
  const minArmsLevel = 1
  const minAbdominalsLevel = 1
  const minLegsLevel = 1
  const minShouldersLevel = 1
  const minCardioLevel = 1
  const minStretchingLevel = 1

  return {
    tier,
    name: `${item} of ${adjectives[Math.floor(Math.random() * 22)]}`,
    price,
    type: itemType,
    level: itemLevel,
    minChestLevel,
    minBackLevel,
    minArmsLevel,
    minAbdominalsLevel,
    minLegsLevel,
    minShouldersLevel,
    minCardioLevel,
    minStretchingLevel,
    combatSkill,
    expBonus,
    coinBonus,
    chestLevelBonus,
    backLevelBonus,
    armsLevelBonus,
    abdominalsLevelBonus,
    legsLevelBonus,
    shouldersLevelBonus,
    cardioLevelBonus,
    stretchingLevelBonus
  }
}

module.exports = generateItem
