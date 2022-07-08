const generateItem = (rarity, characterLevel) => {
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
    case 'legs':
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
  switch (rarity) {
    case 'common':
      combatSkill = Math.ceil(itemLevel * ((Math.random() * 0.1 - 0.11) + 1))
      break
    case 'uncommon':
      combatSkill = Math.floor(itemLevel * ((Math.random() * 0.06 + 0.05) + 1))
      break
    case 'legendary':
      combatSkill = Math.floor(itemLevel * ((Math.random() * 0.06 + 0.1) + 1))
      break
    case 'godly':
      combatSkill = Math.floor(itemLevel * ((Math.random() * 0.16 + 0.15) + 1))
  }

  return {
    name: `${item} of ${adjectives[Math.floor(Math.random() * 22)]}`,
    type: itemType,
    level: itemLevel,
    combatSkill,
  }
}

module.exports = generateItem
