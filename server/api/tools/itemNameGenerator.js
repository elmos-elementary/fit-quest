const generateItem = () => {
  const itemTypes = ['weapon', 'head', 'chest', 'leg', 'ring']
  const adjectives = ['Power', 'Charming', 'Death', 'Pestilence', 'Doom', 'Curses', 'Wealth', 'Hunger', 'Damnation', 'Mending', 'Sanctity', 'Lightness', 'Exiles', 'Collapse', 'Prosperity', 'Woe', 'Malediction', 'Silence', 'Worship', 'the Occult', 'Storms', 'Light', 'Genesis', 'Infinity', 'Enthrallment', 'Judgment', 'Peace', 'Eternity', 'Chaos', 'Lightning', 'Ice', 'Fire', 'Darkness', 'Water', 'Woe', 'Pain', 'Charming', 'Dragons', 'the Void', 'the Heavens', 'Greed', 'Life']
  // roll item type
  const newItemType = itemTypes[Math.floor(Math.random() * 5)]
  let item
  switch (newItemType) {
    case 'weapon':
      item = ['Sword', 'Axe', 'Bow', 'Staff'][Math.floor(Math.random() * 4)]
      break
      case 'head':
        item = ['Helmet', 'Coil', 'Hood'][Math.floor(Math.random() * 3)]
      break
      case 'chest':
        item = ['Chestplate', 'Cloak', 'Robe'][Math.floor(Math.random() * 3)]
      break
      case 'chest':
        item = ['Chestplate', 'Cloak', 'Robe'][Math.floor(Math.random() * 3)]
      break
  }

  return `${item} of ${adjectives[Math.floor(Math.random() * 22)]}`
}

module.exports = generateItemName
