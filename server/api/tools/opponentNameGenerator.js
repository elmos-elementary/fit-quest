const generateOpponentName = () => {
  const adjectives = [
    'Absurd',
    'Enchanted',
    'Ruthless',
    'Chunky',
    'Sparkling',
    'Proud',
    'Colossal',
    'Basic',
    'Oceanic',
    'Tender',
    'Venomous',
    'Lively',
    'Flimsy',
    'Mellow',
    'Abhorrent',
    'Electric',
    'Incredible',
    'Acidic',
    'Noisy',
    'Plain',
  ]
  const creatures = [
    'Dragon',
    'Giant',
    'Goblin',
    'Squid',
    'Vampire',
    'Gargoyle',
    'Mutant',
    'Spirit',
    'Troll',
    'Zombie',
  ]
  return `${adjectives[Math.floor(Math.random() * 20)]} ${
    creatures[Math.floor(Math.random() * 10)]
  }`
}

module.exports = generateOpponentName
